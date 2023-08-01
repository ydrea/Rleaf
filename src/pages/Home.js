import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import geojson from '../data/temakz.geojson.json';
import tileLayer from '../utils/tileLayer';

const center = [45.2, 16.2];

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_i_opi);
}

const MapWrapper = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `click on polygon`;
      return div;
    };

    legend.addTo(map);
  }, [map]);

  return (
    <MapContainer
      whenCreated={setMap}
      center={center}
      zoom={9}
      scrollWheelZoom={false}
    >
      <TileLayer {...tileLayer} />

      <GeoJSON data={geojson} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default MapWrapper;
