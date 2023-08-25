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
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useRef, useEffect, useState } from 'react';
import geolib from 'geolib';

import { Icon } from 'leaflet';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAPhoto } from '../redux/rtk/gallerySlice';

const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}

export const Mapa = () => {
  const [markeri, markeriSet] = useState([]);
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

  const mapZoom = centerMapOnMarker && selectedMarkerCoords ? 12 : 8;

  const handleMapCreated = mapInstance => {
    if (centerMapOnMarker && selectedMarkerCoords) {
      mapInstance.setView(selectedMarkerCoords, mapZoom);
    }
  };

  // ...

  const onLayerToggle = layerName => {
    // Your existing code here
  };

  const { signatura } = useParams();

  useEffect(() => {
    // Your fetchData and markeriSet logic here
  }, []);

  useEffect(() => {
    // Your logic for setting selectedMarkerCoords here
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
              21,
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
      {/* Rest of your component */}
    </div>
  );
};
