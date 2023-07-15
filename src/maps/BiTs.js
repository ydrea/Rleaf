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
const MyMapComponent = () => {
  const wmsLayerOptions = {
    layers: 'administrativna_naselja',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: 'WMS Service Attribution',
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100vh' }}
    >
      <TileLayer
        url="https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0"
        {...wmsLayerOptions}
      />
    </MapContainer>
  );
};

export default MyMapComponent;
