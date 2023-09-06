import React, { useEffect, useRef } from 'react';
import { LayersControl, Map, TileLayer } from 'react-leaflet';

const center = [51.505, -0.09];

export default function App() {
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current.leafletElement;
    map.on('baselayerchange', e => {
      //do whatever
      console.log(e.name);
      switch (e.name) {
        case 'OpenStreetMap.Mapnik':
          flyToParis(map);
          break;
        case 'OpenStreetMap.BlackAndWhite':
          console.log('do something else');
          break;
        default:
          return;
      }
    });
  }, []);

  const flyToParis = map => {
    console.log(map);
    map.panTo([48.864716, 2.349014]);
  };

  return (
    <Map
      center={center}
      zoom={13}
      style={{ height: '100vh' }}
      ref={mapRef}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </Map>
  );
}
