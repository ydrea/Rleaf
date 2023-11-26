import 'leaflet/dist/leaflet.css';

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
} from 'react-leaflet';
import axios from 'axios';
import { Icon } from 'leaflet';
import { useSelector } from 'react-redux';
// import { selectEm } from '../redux/rtk/mapSlice';

//
// function onEachFeature(feature, layer) {
//   layer.bindPopup(feature.properties.name);
// }

//
export const MapaWfs = () => {
  const [data, setData] = useState([]);
  // const wfs1 = useSelector(selectEm);

  // const handleMapClick = e => {
  //   console.log('Map clicked!', e.latlng);
  // };

  // useEffect(() => {
  //   // Make the WFS request
  //   axios
  //     .get(
  //       'https://starigrad.agr.unizg.hr/geoserver/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=qgis2webtest:kopnena_stanista_2016&outputFormat=application/json&srsName=epsg:4326'
  //     )
  //     .then(response => {
  //       setData(response.data); // Assuming the response contains the GeoJSON data
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching WFS data:', error);
  //     });
  // }, [data]);

  // const myIcon = new Icon({
  //   iconUrl: require('../assets/ikona.png'),
  //   iconSize: [28, 28],
  // });

  const { BaseLayer, Overlay } = LayersControl;

  return (
    <MapContainer
      center={[45.2, 16.2]}
      zoom={8}
      style={{ height: '100vh', width: '100%' }}
    >
      <LayersControl>
        <BaseLayer checked name="OSM1">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
      </LayersControl>
      {''}
      {/* {wfs1 && <GeoJSON wfs1={wfs1} onEachFeature={onEachFeature} />} */}
    </MapContainer>
  );
};
