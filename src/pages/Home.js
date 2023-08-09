import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import geojson from '../data/temakz.geojson.json';
import tileLayer from '../utils/tileLayer';
//
const center = [45.2, 16.2];

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}
function Home() {
  const [map, setMap] = useState(null);
  const [data, dataSet] = useState();

  const getTkz = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER + '/wfs_tkz'
      );
      const jsonData = await res.json();
      console.log('Fetched GeoJSON data:', jsonData);
      dataSet(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getTkz();
  }, []);

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `Custom Legend Content`;
      return div;
    };
    legend.addTo(map);
  }, [map]);

  return (
    <>Home</>
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
  );
}

export default Home;
