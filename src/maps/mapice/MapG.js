import React, { Component } from 'react';
import { render } from 'react-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import * as WMS from 'leaflet.wms';

function CustomWMSLayer(props) {
  const { url, options, layers } = props;
  const ctx = useMap();

  if (!ctx) {
    // Handle the case where useMap() returns undefined
    console.error('Map context is undefined.');
    return null;
  }
  const map = ctx.map;

  if (!map) {
    // Handle the case where the map object is undefined
    console.error('Map object is undefined.');
    return null;
  }

  // Add WMS source/layers
  const source = WMS.source(url, options);

  if (source) {
    for (let name of layers) {
      const layer = source.getLayer(name);
      if (layer) {
        layer.addTo(map);
      } else {
        console.error(`Layer '${name}' not found in WMS source.`);
      }
    }
  } else {
    console.error('WMS source is undefined.');
  }

  return null;
}

//   for (let name of layers) {
//     source.getLayer(name).addTo(map);
//   }

//   return null;
// }

// import './style.css';

export default function Map() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={3}>
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CustomWMSLayer
        layers={['TOPO-WMS']}
        options={{
          format: 'image/png',
          transparent: 'true',
          attribution:
            "<a href='https://ows.terrestris.de/'>terrestris</a>",
          info_format: 'text/html',
        }}
        url="https://ows.terrestris.de/osm/service"
      />
    </MapContainer>
  );
}
