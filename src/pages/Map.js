import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
} from 'react-leaflet';
import {
  ANaselja,
  PAJedinice,
  PBNaselja,
  FiksniElementi,
  PodRH,
  TemaZP,
  TemaP,
  TemaS,
  TemaEWAP,
} from '../maps/wms';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card } from '../comps/Card';
import Footer from '../comps/Footer';
// import Fly from './Fly';
import { useDispatch } from 'react-redux';
import { setSelectedMarker } from '../redux/rtk/mapSlice';
// import { Ewap } from './temaEwap';
import geojson from '../data/temakz.geojson.json';

//

const fetchLegend = async layerName => {
  try {
    const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${layerName}&FORMAT=image/png`;

    const response = await axios.get(legendUrl, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching legend:', error);
    return null;
  }
};

//
export const Map = () => {
  const [clickedPhoto, setClickedPhoto] = useState(null);
  const [markeri, markeriSet] = useState([]);
  const dispatch = useDispatch();

  //temaKZ
  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.code_opis);
  }
  //controls
  const { BaseLayer, Overlay } = LayersControl;

  // refs
  const mapRef = useRef(null);
  const cardRef = useRef(null);
  //center, coords
  const [selectedMarkerCoords, setSelectedMarkerCoords] =
    useState(null);
  const [centerMapOnMarker, setCenterMapOnMarker] = useState(false);
  //prog. zoom
  const mapCenter =
    centerMapOnMarker && selectedMarkerCoords
      ? selectedMarkerCoords
      : [45.28, 16.04];
  const mapZoom = centerMapOnMarker && selectedMarkerCoords ? 14 : 9;
  //custom icon
  const myIcon = new Icon({
    iconUrl: require('../assets/ikona.png'),
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  //tipofthespear - Banija
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
            photoData: item,
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

  //handle click
  const handlePhotoClick = photo => {
    setClickedPhoto(photo);
    const marker = markeri.find(
      marker => marker.popUp === photo.popUp
    );
    if (marker) {
      dispatch(setSelectedMarker(marker));
    }
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '70vh', width: '70vw' }}
        whenCreated={map => {
          if (mapRef.current === null) {
            mapRef.current = map;
          }
        }}
      >
        <LayersControl>
          <BaseLayer checked name="OSM">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer name="reljef" zIndex={0}>
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
            <BaseLayer name="tema_EWAP">
              <TemaEWAP />
            </BaseLayer>
          </LayersControl>
        </LayersControl>

        {/* markeri     */}
        {markeri.map(i => (
          <Marker
            key={i.geocode[0] + Math.random()}
            position={i.geocode}
            icon={myIcon}
          >
            <Popup>
              {i.popUp}
              <Link
                to={`/photos/${i.popUp}`}
                onClick={event => {
                  event.preventDefault();
                  handlePhotoClick(i);
                }}
              >
                <img
                  width="233px"
                  src={`${process.env.REACT_APP_SERVER_PUB}/${i.popUp}`}
                  alt={i.popUp}
                />
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* under the map */}
      {clickedPhoto && (
        <div ref={cardRef}>
          <Card photo={clickedPhoto.photoData} />
        </div>
      )}
      <Footer />
    </div>
  );
};
