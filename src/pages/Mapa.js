import { useSelector } from 'react-redux';
// import { selectEm, addEmd } from '../redux/rtk/mapSlice';
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
  WMSTileLayer,
} from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'leaflet';
import { UseMap } from './Mapb';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
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

  const { BaseLayer } = LayersControl;

  useEffect(() => {
    // Make the WFS request
    axios
      .get(
        // 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=naselja_stanovnistvo&outputFormat=application/json&srsName=epsg:4326'
        // 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_gradoviRH&outputFormat=application/json&srsName=epsg:4326'
        'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_drzavna_granica&outputFormat=application/json&srsName=epsg:4326'
        // 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_granice_banije&outputFormat=application/json&srsName=epsg:4326'
        // 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=fiksno_granice_banije&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0'
      )
      .then(response => {
        setData(response.data); // Assuming the response contains the GeoJSON data
        console.log(data);
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

  // useEffect(() => {
  //   // Make the WFS request
  //   axios
  //     .get(
  //       'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_drzavna_granica&outputFormat=application/json&srsName=epsg:4326'
  //     )
  //     .then(response => {
  //       setTemakz(response.data);
  //       console.log(temakz);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching WFS data:', error);
  //     });
  // }, [data]);

  return (
    <MapContainer
      center={[45.2, 16.2]}
      zoom={8}
      style={{ height: '80vh' }}
    >
      <LayersControl>
        <BaseLayer checked name="OSM">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <UseMap />{' '}
      </LayersControl>

      {/* {temakz && <GeoJSON temakz={temakz} />} */}
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
