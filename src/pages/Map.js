import geojson from '../data/temakz.geojson.json';
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
  ZoomControl,
  // WMSTileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useRef, useEffect, useState } from 'react';
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
import { transition } from '../transition';
import CustomCtrl from '../comps/CustomCtrl';
// import CustomZoom from '../comps/CustomZoom';
import Legend from './Legend';
import './mapa.css';
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

export function Map() {
  const [lajeri, lajeriSet] = useState([
    { name: 't1', visible: true },
    { name: 't2', visible: false },
  ]);
  //
  const [markeri, markeriSet] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);

  //external control
  const onLayerToggle = layerName => {
    lajeriSet(prevLayers =>
      prevLayers.map(layer =>
        layer.name === layerName
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };
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

  //deep inside
  const mapRef = useRef();
  useEffect(() => {
    const map = mapRef.current; //.leafletElement;
    if (map) {
      map.on('baselayerchange', e => {
        console.log(e.name);
        setSelectedLayer(e.name);
      });
    }
  }, [selectedLayer]);

  useEffect(() => {
    console.log(selectedLayer);
  }, [selectedLayer]);

  //and out
  const { BaseLayer, Overlay } = LayersControl;

  return (
    <div
      style={{
        height: '80vh',
        width: '60vw',
        paddingLeft: '15vw',
      }}
    >
      {/* <CustomZoom /> */}
      <CustomCtrl layers={lajeri} onLayerToggle={onLayerToggle} />

      <MapContainer
        ref={mapRef}
        center={[45.2, 16.2]}
        zoom={8}
        style={{ height: '80vh' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        {selectedLayer && (
          <Legend
            styles={{
              position: 'fixed',
              top: '20',
              right: '0',
              zIndex: '555',
            }}
            selectedLayer={selectedLayer}
          />
        )}
        <LayersControl>
          <BaseLayer checked name="OSM">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="podloge_reljef_hidrologija">
            <PodRH />
          </BaseLayer>
          <FiksniElementi />
          <Overlay name="administrativna_naselja">
            <ANaselja />
          </Overlay>
          <Overlay name="preklop_banijska_naselja">
            <PBNaselja
              eventHandlers={{
                add: e => {
                  console.log('Added Layer:', e.target);
                  setSelectedLayer('preklop_banijska_naselja');
                },
                remove: e => {
                  console.log('Removed layer:', e.target);
                },
              }}
            />
          </Overlay>
          <Overlay name="preklop_administrativne_jedinice">
            <PAJedinice
              eventHandlers={{
                add: e => {
                  console.log('Added Layer:', e.target);
                  setSelectedLayer(
                    'preklop_administrativne_jedinice'
                  );
                },
                remove: e => {
                  console.log('Removed layer:', e.target);
                },
              }}
            />
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
        {lajeri.map(
          layer =>
            layer.visible && (
              <Marker
                position={[45.21, 16.19]}
                icon={myIcon}
                key={layer.name}
              >
                <Popup>{layer.name}</Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}
// export default Mapa;
