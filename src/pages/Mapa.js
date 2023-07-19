import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
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
import { Icon } from 'leaflet';
//prettier-ignore
import {
  ANaselja, PAJedinice,  PBNaselja, JLS,   FiksniElementi,
  PodRH, TemaKZ, TemaZP, TemaP
} from '../maps/wms';
import { Stanovnistvo } from '../maps/wfs';
//prettier-ignore
const markers = [
  { geocode: [45.2, 16.2], popUp: 'medo?'},
  { geocode: [45.22, 16.25], popUp: 'zeko!'},
  { geocode: [45.21, 16.24], popUp: 'kravicaa!'},
];
//
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//
export const Mapa = () => {
  const [data, setData] = useState(null);

  const { BaseLayer, Overlay } = LayersControl;

  return (
    <MapContainer
      center={[45.2, 16.2]}
      zoom={8}
      style={{ height: '80vh' }}
    >
      <LayersControl>
        <BaseLayer checked name="OSM">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <BaseLayer name="reljef">
          <PodRH />
        </BaseLayer>
        <FiksniElementi />
        <Overlay name="admin. naselja">
          <ANaselja />
        </Overlay>
        <Overlay name="P banijska naselja">
          <PBNaselja />
        </Overlay>
        <Overlay name="Stanovnistvo">
          <Stanovnistvo />
        </Overlay>
        <Overlay name="P administrativne jedinice">
          <PAJedinice />
        </Overlay>
        <LayersControl>
          <BaseLayer name="tema_koristenje_zemljista">
            <TemaKZ />
          </BaseLayer>
          <BaseLayer name="zastita_prirode">
            <TemaZP />
          </BaseLayer>
          <BaseLayer name="potres">
            <TemaP />
          </BaseLayer>
        </LayersControl>
      </LayersControl>

      {data && <GeoJSON data={data} />}
      <MarkerClusterGroup>
        {markers.map(i => (
          <Marker
            key={i.geocode[0]}
            position={i.geocode}
            icon={myIcon}
          >
            <Popup>{i.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
