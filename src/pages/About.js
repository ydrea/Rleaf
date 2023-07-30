import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
  // WMSTileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import iconUrl from '../assets/ikona.png'; // Check the path to the icon image

const myIcon = new L.Icon({
  iconUrl: iconUrl.default,
  iconSize: [28, 28],
});
//prettier-ignore
const markers = [
  { geocode: [45.2, 16.2], popUp: 'medo?'},
  { geocode: [45.22, 16.25], popUp: 'zeko!'},
  { geocode: [45.21, 16.24], popUp: 'kravicaa!'},
];
//
//

export const About = () => {
  // const [data, setData] = useState([]);

  // const { BaseLayer, Overlay } = LayersControl;
  // //
  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326&TYPENAME=naselja_stanovnistvo'
  //     )
  //     .then(response => {
  //       setData(response.data); // Assuming the response contains the GeoJSON data
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching WFS data:', error);
  //     });
  // }, [data]);

  // const onEachFeature = async (feature, layer) => {
  //   await layer.bindPopup(feature.properties.name);
  // };

  //
  return (
    <>O nama</>
    // <MapContainer
    //   center={[45.2, 16.2]}
    //   zoom={8}
    //   style={{ height: '80vh' }}
    // >
    //   <LayersControl>
    //     <BaseLayer checked name="OSM1">
    //       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //     </BaseLayer>
    //   </LayersControl>
    //   {''}
    //   {data && <GeoJSON data={data} onEachFeature={onEachFeature} />}
    //   <MarkerClusterGroup>
    //     {markers.map(i => (
    //       <Marker
    //         key={i.geocode[0]}
    //         position={i.geocode}
    //         icon={myIcon}
    //       >
    //         <Popup>{i.popUp}</Popup>
    //       </Marker>
    //     ))}
    //   </MarkerClusterGroup>
    // </MapContainer>
  );
};
