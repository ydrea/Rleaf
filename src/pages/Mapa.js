import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
// import Ikona from '';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'leaflet';
//import { useGetCapabilitiesQuery } from '../redux/api/apiSlice';

const markers = [
  {
    geocode: [45, 16],
    popUp: 'medo?',
  },
  {
    geocode: [45.02, 16.05],
    popUp: 'zeko!',
  },
  {
    geocode: [45.01, 16.04],
    popUp: 'ribicaa!',
  },
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
  let content;
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
      center={[45.501, 13.5]}
      zoom={13}
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
