import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import chroma from 'chroma-js'; // Import Chroma.js
import geojson from '../data/temakz.geojson.json';

export const Map = () => {
  // Your GeoJSON data
  const geojsonData = geojson; // Assign the imported GeoJSON directly

  // Extract unique 'code_opis' values from your GeoJSON data
  const uniqueCodeOpisValues = [
    ...new Set(
      geojsonData.features.map(
        feature => feature.properties.code_opis
      )
    ),
  ];

  // Generate 6 random color codes
  const randomColorCodes = Array.from({ length: 6 }, () =>
    chroma.random().hex()
  );

  // Create a color mapping for 'code_opis' values
  const colorMapping = {};
  uniqueCodeOpisValues.forEach((codeOpis, index) => {
    colorMapping[codeOpis] = randomColorCodes[index];
  });

  return (
    <MapContainer
      center={[46.2, 16.2]} // Replace with your desired map center
      zoom={9} // Replace with your desired zoom level
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add the GeoJSON layer */}
      <GeoJSON
        data={geojsonData}
        style={feature => ({
          fillColor: colorMapping[feature.properties.code_opis],
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        })}
        onEachFeature={(feature, layer) => {
          // Bind popup to each feature
          layer.bindPopup(feature.properties.code_opis);
        }}
      />
    </MapContainer>
  );
};
