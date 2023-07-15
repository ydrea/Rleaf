import { useSelector } from 'react-redux';
// import { selectEm, addEmd } from '../redux/rtk/mapSlice';
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
  WMSTileLayer,
} from 'react-leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'leaflet';
import { Borders } from '../maps/borders';
import { Border } from '../maps/border';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { Cities } from '../maps/cities';
import { TemaKZ } from '../maps/temakz';
import { PreklopBN } from '../maps/preklopbn';
import { PreklopAJ } from '../maps/preklopaj';
import { ANaselja, PBNaselja } from '../maps/wms';
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
        <Border checked name="granica" />
        <Borders checked name="granice" />
        <Cities checked name="gradovi" Icon={myIcon} />{' '}
        <BaseLayer name="koristenje zemljista">
          <TemaKZ />
        </BaseLayer>
        <LayersControl.Overlay>
          <ANaselja checked name="admin. naselja" />
          <PBNaselja checked name="P banijska naselja" />
          {/* <PreklopBN name="banijska naselja" />
          <PreklopAJ name="administrativne jedinice" /> */}
        </LayersControl.Overlay>
      </LayersControl>

      {/* {temakz && <GeoJSON temakz={temakz} />} */}
      {data && <GeoJSON data={data} />}
      <MarkerClusterGroup>
        {markers.map(i => (
          <Marker position={i.geocode} icon={myIcon}>
            <Popup>{i.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
