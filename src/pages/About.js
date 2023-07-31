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

import 'proj4'; // import required for side effect
import 'proj4leaflet'; // import required for side effect

// const myIcon = new L.Icon({
//   iconUrl: iconUrl.default,
//   iconSize: [28, 28],
// });
//prettier-ignore
// const markers = [
//   { geocode: [45.2, 16.2], popUp: 'medo?'},
//   { geocode: [45.22, 16.25], popUp: 'zeko!'},
//   { geocode: [45.21, 16.24], popUp: 'kravicaa!'},
// ];
//

// function EPSG3879() {
//   // eslint-disable-line
//   const crsName = 'EPSG:3879';
//   const projDef =
//     '+proj=tmerc +lat_0=0 +lon_0=25 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
//   const bounds = [25440000, 6630000, 25571072, 6761072];
//   const originNw = [bounds.min.x, bounds.max.y];
//   const crsOpts = {
//     resolutions: [
//       256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625,
//       0.03125,
//     ],
//   };
//   return new L.Proj.CRS(crsName, projDef, bounds, crsOpts);
// }

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
  // const layer = new L.WFS({
  //   url: 'https://kartta.hel.fi/ws/geoserver/avoindata/wfs?',
  //   typeNS: 'avoindata',
  //   typeName: 'Kaupunginosajako',
  //   crs: EPSG3879(),
  //   style: {
  //     color: 'blue',
  //     weight: 2,
  //   },
  // });
  //

  // const helsinkiCoordinates = [60.192059, 24.945831];
  // const crs = EPSG3879();
  // const url = 'https://kartta.hel.fi/ws/geoserver/avoindata/wms?'; // you may use any geoserver you know
  // const wmsOptions = { layers: 'avoindata:Opaskartta_1940' }; // comma-separated string of any WMS layer(s) on the geoserver
  // return (
  //   <Map center={helsinkiCoordinates} zoom={8} minZoom={5} scrollWheelZoom={false} crs={crs}>
  //     <WMSTileLayer url={url} wmsOptions={wmsOptions}/>
  //   </Map>);

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
    //   {layer}
    //   {data && <GeoJSON data={data} onEachFeature={onEachFeature} />}
    // </MapContainer>
  );
};
