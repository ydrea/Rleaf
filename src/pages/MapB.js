import geojson from '../data/temakz.geojson.json';
import axios from 'axios';
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
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useRef, useEffect, useState } from 'react';
import geolib from 'geolib';

import { Icon } from 'leaflet';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAPhoto } from '../redux/rtk/gallerySlice';
import { CustomCtrl } from '../comps/CustomCtrl';
//
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}

export const Mapa = () => {
  const selectedPhoto = useSelector(selectAPhoto);
  const dispatch = useDispatch();

  const [selectedMarkerCoords, setSelectedMarkerCoords] =
    useState(null);
  const [centerMapOnMarker, setCenterMapOnMarker] = useState(false);

  const mapRef = useRef(null);
  const markerClusterRef = useRef(null);

  const mapCenter =
    centerMapOnMarker && selectedMarkerCoords
      ? selectedMarkerCoords
      : [45.2, 16.2];
  useEffect(() => {
    if (centerMapOnMarker && selectedMarkerCoords) {
      if (markerClusterRef.current) {
        const closestMarkerIndex = findClosestMarker(
          selectedMarkerCoords,
          markeri
        );
        if (closestMarkerIndex !== -1) {
          const markerToClick =
            markerClusterRef.current._childMarkerContext.childMarkers[
              closestMarkerIndex
            ];
          if (markerToClick) {
            markerToClick.openPopup();

            const distanceMeters = geolib.getDistance(
              { latitude: mapCenter[0], longitude: mapCenter[1] },
              {
                latitude: selectedMarkerCoords[0],
                longitude: selectedMarkerCoords[1],
              }
            );

            const zoomLevel = Math.min(
              18,
              16 - Math.log2(distanceMeters / 1000)
            );

            mapRef.current.leafletElement.setView(
              selectedMarkerCoords,
              zoomLevel
            );
          }
        }
      }
      setCenterMapOnMarker(false);
    }
  }, [centerMapOnMarker, selectedMarkerCoords, markeri, mapCenter]);

  const mapZoom = centerMapOnMarker && selectedMarkerCoords ? 18 : 12;

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

  const { signatura } = useParams();

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
        return parsedData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(markeri);
  }, []);

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
    if (centerMapOnMarker && selectedMarkerCoords) {
      if (markerClusterRef.current) {
        const closestMarkerIndex = findClosestMarker(
          selectedMarkerCoords,
          markeri
        );
        if (closestMarkerIndex !== -1) {
          const markerToClick =
            markerClusterRef.current._childMarkerContext.childMarkers[
              closestMarkerIndex
            ];
          if (markerToClick) {
            markerToClick.openPopup();

            const distanceMeters = geolib.getDistance(
              { latitude: mapCenter[0], longitude: mapCenter[1] },
              {
                latitude: selectedMarkerCoords[0],
                longitude: selectedMarkerCoords[1],
              }
            );

            const zoomLevel = Math.min(
              18,
              16 - Math.log2(distanceMeters / 1000)
            );

            mapRef.current.leafletElement.setView(
              selectedMarkerCoords,
              zoomLevel
            );
          }
        }
      }
      setCenterMapOnMarker(false);
    }
  }, [centerMapOnMarker, selectedMarkerCoords, markeri, mapCenter]);

  const { BaseLayer, Overlay } = LayersControl;

  return (
    <div style={{ height: '70vh', width: '140vh' }}>
      <CustomCtrl layers={lajeri} onLayerToggle={onLayerToggle} />
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '80vh' }}
        whenCreated={handleMapCreated}
        ref={mapRef} // Add a ref to the MapContainer
      >
        {' '}
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
      {/* Display the selected photo */}
      {selectedPhoto && (
        <div className="selected-photo">
          <h3>Selected Photo</h3>
          <img
            width="1233px"
            src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`}
            alt={selectedPhoto.signatura}
          />
          <p>Signatura: {selectedPhoto.signatura}</p>
        </div>
      )}{' '}
    </div>
  );
};
