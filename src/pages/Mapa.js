import geojson from '../data/temakz.geojson.json';
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
} from 'react-leaflet';
import MarkerClusterGroup, {
  findClosestMarker,
} from 'react-leaflet-cluster';
import { useRef, useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import {
  ANaselja,
  PAJedinice,
  PBNaselja,
  FiksniElementi,
  PodRH,
  TemaZP,
  TemaP,
  TemaS,
} from '../maps/wms';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CustomCtrl from '../comps/CustomCtrl';

import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedMarker,
  clearSelectedMarker,
  setMarkerClusterRef,
} from '../redux/rtk/mapSlice';

const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}

export const Mapa = () => {
  const dispatch = useDispatch();
  const selectedMarkerCoords = useSelector(
    state => state.map.selectedMarkerCoords
  );
  const selectedMarkerPopUp = useSelector(
    state => state.map.selectedMarkerPopUp
  );

  // const dispatch = useDispatch();

  useEffect(() => {
    // Set the markerClusterRef in the Redux store
    dispatch(setMarkerClusterRef(markerClusterRef));
  }, [dispatch]);

  //ol

  const handleMapCreated = mapInstance => {
    if (centerMapOnMarker && selectedMarkerCoords) {
      mapInstance.setView(selectedMarkerCoords, mapZoom);
    }
  };
  const [lajeri, lajeriSet] = useState([
    { name: 't1', visible: true },
    { name: 't2', visible: false },
  ]);

  const [markeri, markeriSet] = useState([]);

  const onLayerToggle = layerName => {
    lajeriSet(prevLayers =>
      prevLayers.map(layer =>
        layer.name === layerName
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };

  const { popUp, signatura } = useParams();
  //

  const mapRef = useRef(null);
  const markerClusterRef = useRef(null);

  const mapCenter = selectedMarkerCoords || [45.2, 16.2];
  const mapZoom = selectedMarkerCoords ? 12 : 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/json_photos`
        );
        const parsedData = response.data.map(item => {
          const geo = JSON.parse(item.geometry);
          return {
            popUp: item.signatura,
            geocode: [geo.coordinates[1], geo.coordinates[0]],
          };
        });
        markeriSet(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //
  useEffect(() => {
    if (signatura && markeri.length > 0) {
      const selectedMarker = markeri.find(
        marker => marker.popUp === signatura
      );
      if (selectedMarker) {
        setSelectedMarkerCoords(selectedMarker.geocode);
        setCenterMapOnMarker(true);
      }
    }
  }, [signatura, markeri]);

  useEffect(() => {
    if (selectedMarkerCoords && selectedMarkerPopUp) {
      if (markerClusterRef.current) {
        const markerToClick = markeri.find(
          marker => marker.popUp === selectedMarkerPopUp
        );

        if (markerToClick) {
          const markerIndex = markeri.indexOf(markerToClick);

          if (markerClusterRef.current) {
            const markerCluster =
              markerClusterRef.current.leafletElement;
            const markerLayer =
              markerCluster.getVisibleParent(markerIndex);

            if (markerLayer) {
              markerLayer.fireEvent('click');
            }

            if (mapRef.current) {
              mapRef.current.leafletElement.setView(
                selectedMarkerCoords,
                mapZoom
              );
            }
          }
        }
      }
    }
  }, [selectedMarkerCoords, selectedMarkerPopUp, markeri, mapZoom]);
  //
  const { BaseLayer, Overlay } = LayersControl;

  return (
    <div style={{ height: '70vh', width: '140vh' }}>
      <CustomCtrl layers={lajeri} onLayerToggle={onLayerToggle} />
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '80vh' }}
        whenCreated={handleMapCreated}
        ref={mapRef}
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

        <MarkerClusterGroup ref={markerClusterRef}>
          {markeri.map(i => (
            <Marker
              key={i.geocode[0] + Math.random()}
              position={i.geocode}
              icon={myIcon}
            >
              <Popup>
                {i.popUp}
                <Link to={`/photos/${i.popUp}`}>
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
    </div>
  );
};
