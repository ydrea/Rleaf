import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, MapContainer, TileLayer } from 'react-leaflet';
import CustomWMSLayer from './CustomWMSLayer';

import './style.css';

export default function CustomMap() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={3}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CustomWMSLayer
        layers={['TOPO-WMS']}
        options={{
          format: 'image/png',
          transparent: 'true',
          attribution:
            "<a href='https://ows.terrestris.de/'>terrestris</a>",
          info_format: 'text/plain',
        }}
        url="https://ows.terrestris.de/osm/service"
      />
    </MapContainer>
  );
}
