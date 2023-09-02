import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import geojson from '../data/temakz.geojson.json';
import tileLayer from '../utils/tileLayer';
//
// const center = [45.2, 16.2];

// function onEachFeature(feature, layer) {
//   layer.bindPopup(feature.properties.code_opis);
// }
//   const [map, setMap] = useState(null);
//   const [data, dataSet] = useState();

//   const getTkz = async () => {
//     try {
//       const res = await fetch(
//         process.env.REACT_APP_SERVER + '/wfs_tkz'
//       );
//       const jsonData = await res.json();
//       console.log('Fetched GeoJSON data:', jsonData);
//       dataSet(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//     }
//   };

//   useEffect(() => {
//     getTkz();
//   }, []);

//   useEffect(() => {
//     if (!map) return;

//     const legend = L.control({ position: 'bottomleft' });

//     legend.onAdd = () => {
//       const div = L.DomUtil.create('div', 'legend');
//       div.innerHTML = `Custom Legend Content`;
//       return div;
//     };
//     legend.addTo(map);
//   }, [map]);

// <MapContainer
//   whenCreated={setMap}
//   center={center}
//   zoom={9}
//   scrollWheelZoom={false}
//   style={{ height: '90vh', width: '90%' }} // Ensure the map container has a size
// >
//   <TileLayer {...tileLayer} />
//   {/* Log the GeoJSON data */}
//   {console.log('Rendered GeoJSON data:', data)}
//   {/* Render GeoJSON features */}
//   {data && (
//     <GeoJSON data={data} onEachFeature={onEachFeature} />
//   )}{' '}
// </MapContainer>

// const mapb = useMap();
// console.log('map center:', mapb.getCenter());
// const layerSrc = LeafletWms.source(
//   'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326'
// );
// layerSrc.getLayer({ layer: 'fiksno_drzavna_granica' }).addTo(mapb);

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

// useEffect(() => {
//   // Make the WFS request
//   axios
//     .get(
//       // 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=naselja_stanovnistvo&outputFormat=application/json&srsName=epsg:4326'
//       // 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_gradoviRH&outputFormat=application/json&srsName=epsg:4326'
//       'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_drzavna_granica&outputFormat=application/json&srsName=epsg:4326'
//       // 'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_granice_banije&outputFormat=application/json&srsName=epsg:4326'
//       // 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=fiksno_granice_banije&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0'
//     )
//     .then(response => {
//       setData(response.data); // Assuming the response contains the GeoJSON data
//       console.log(data);
//     })
//     .catch(error => {
//       console.error('Error fetching WFS data:', error);
//     });
// }, []);

// const MyMapComponent = () => {
//   const wmsLayerOptions = {
//     layers: 'administrativna_naselja',
//     format: 'image/png',
//     transparent: true,
//     version: '1.1.0',
//     attribution: 'WMS Service Attribution',
//   };

//   return (
//     <MapContainer
//       center={[51.505, -0.09]}
//       zoom={13}
//       style={{ height: '100vh' }}
//     >
//       <TileLayer
//         url="https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0"
//         {...wmsLayerOptions}
//       />
//     </MapContainer>
//   );
// };

// export default MyMapComponent;

{
  /* <Border checked name="granica" />
        <Borders checked name="granice" />
        <Cities checked name="gradovi" Icon={myIcon} />{' '} */
}
