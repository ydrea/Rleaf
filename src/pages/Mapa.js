import { useSelector } from 'react-redux';
import { selectEm, addEmd } from '../redux/rtk/mapSlice';
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'leaflet';

//prettier-ignore
const markers = [
  { geocode: [45.2, 16.2], popUp: 'medo?'},
  { geocode: [45.22, 16.25], popUp: 'zeko!'},
  { geocode: [45.21, 16.24], popUp: 'kravicaa!'},
];
//
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//
export const Mapa = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make the WFS request
    axios
      .get(
        'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_granice_banije&outputFormat=application/json&srsName=epsg:4326'
      )
      .then(response => {
        setData(response.data); // Assuming the response contains the GeoJSON data
      })
      .catch(error => {
        console.error('Error fetching WFS data:', error);
      });
  }, []);

  // const { mapa, isLoading, isSuccess, isError, error } =
  //   useGetCapabilitiesQuery();
  // //
  // let content;
  // if (isLoading) {
  // console.log('loding');
  //   content = <p>isLoading</p>;
  // } else if (isSuccess) {
  //   console.log('po', mapa);
  // content = JSON.stringify(mapa);
  // } else if (isError) {
  //   console.log(error);
  //   content = <p>{error}</p>;
  // }

  return (
    <MapContainer
      center={[45.2, 16.2]}
      zoom={8}
      style={{ height: '80vh' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data && <GeoJSON data={data} />}
      <MarkerClusterGroup>
        {markers.map(i => (
          <Marker position={i.geocode} icon={myIcon}>
            <Popup>{i.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
