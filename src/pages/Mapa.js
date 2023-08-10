import geojson from '../data/temakz.geojson.json';
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
  ANaselja, PAJedinice,  PBNaselja, FiksniElementi,
  PodRH, TemaZP, TemaP, TemaS
} from '../maps/wms';
// import { markeri } from '../maps/markeri';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Foto = () => {
  const routeParams = useParams();
};
//
// foto layer
//prettier-ignore

const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//

//temaKZ
function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}

export const Mapa = () => {
  const [data, setData] = useState(null);
  const [markeri, markeriSet] = useState([]);

  //tipofthespear
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/json_photos`
        );
        console.log(response.data);
        const parsedData = response.data.map(item => {
          const geo = JSON.parse(item.geometry);
          return {
            popUp: item.signatura,
            geocode: [geo.coordinates[1], geo.coordinates[0]],
          };
        });
        markeriSet(parsedData);
        return parsedData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
        <Overlay name="P administrativne jedinice">
          <PAJedinice />
        </Overlay>
        <LayersControl>
          <BaseLayer name="tema_koristenje_zemljista">
            <GeoJSON data={geojson} onEachFeature={onEachFeature} />
          </BaseLayer>
          <BaseLayer name="tema_zastita_prirode">
            <TemaZP />
          </BaseLayer>
          <BaseLayer name="tema_stanovnistvo">
            <TemaS />
          </BaseLayer>
          <BaseLayer name="tema_potres">
            <TemaP />
          </BaseLayer>
        </LayersControl>
      </LayersControl>

      {/* {data && <GeoJSON data={data} />} */}

      <MarkerClusterGroup>
        {markeri.map(i => (
          <Marker
            key={i.geocode[0] + Math.random()}
            position={i.geocode}
            icon={myIcon}
          >
            <Popup>
              {i.popUp}
              <Link to={{ pathname: '/photos', params: i.popUp }}>
                <img
                  width="233px"
                  src={`${process.env.REACT_APP_SERVER_PUB}/${i.popUp}`}
                  alt={i.popUp}
                />
              </Link>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
