import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'leaflet';
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
import axios from 'axios';
import { useSelector } from 'react-redux';
//prettier-ignore
import {
  ANaselja, PAJedinice,  PBNaselja, FiksniElementi,
  PodRH, TemaZP, TemaP, TemaS
} from '../maps/wms';
import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectSelectedPhotoIndex,
  setFilters,
  selectFilteredPhotos,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import { useParams } from 'react-router-dom';
import Legend from './Legend';

import Footer from '../comps/Footer';
import './mapa.css';

// Define custom icon
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//prettier-ignore
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

//temaKZ
function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}
function useMarkersData() {
  const [markersData, setMarkersData] = useState([]);

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
        setMarkersData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return markersData;
}

export function Map() {
  const [lajeri, lajeriSet] = useState([
    { name: 't1', visible: true },
    { name: 't2', visible: false },
  ]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = useSelector(
    state => state.gallery.selectedPhoto
  );

  const markersData = useMarkersData();

  // Function to open the popup for a specific marker
  const openPopup = marker => {
    setSelectedMarker(marker);
  };

  // Function to close the popup
  const closePopup = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    if (selectedPhoto) {
      console.log('====================================');
      console.log(selectedPhoto);
      console.log('====================================');
      // Find the marker that corresponds to the selectedPhoto
      const matchingMarker = markersData.find(
        marker => marker.popUp === selectedPhoto.signatura
      );

      // Open the popup for the matching marker
      if (matchingMarker) {
        openPopup(matchingMarker);
      }
    }
  }, [selectedPhoto, markersData]);

  const [markeri, markeriSet] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState();

  const markerRef = useRef([]);
  // URL parameter
  const [shouldZoomAndClick, setShouldZoomAndClick] = useState(false);
  const { signatura } = useParams();
  console.log('====================================');
  console.log(signatura);
  console.log('====================================');

  const { BaseLayer, Overlay } = LayersControl;

  //
  return (
    <div
      style={{
        height: '80vh',
        width: '60vw',
        paddingLeft: '15vw',
      }}
    >
      {/* <CustomZoom /> */}
      {/* <CustomCtrl layers={lajeri} onLayerToggle={onLayerToggle} /> */}

      <MapContainer
        // ref={mapRef}
        center={[45.2, 16.2]}
        zoom={8}
        style={{ height: '80vh' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        {/* {selectedLayer && (
          <Legend
            styles={{
              position: 'fixed',
              top: '20',
              right: '0',
              zIndex: '5555',
            }}
            selectedLayer={selectedLayer}
          />
        )} */}
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
        {/* <MarkerClusterGroup> */}
        {shouldZoomAndClick &&
          // Use a setTimeout to delay the click action slightly
          setTimeout(() => {
            console.log('Timeout triggered');
            const marker = markerRef.current;
            if (marker) {
              marker.openPopup();
            }
          }, 100)}
        {markeri.map(i => (
          <Marker
            key={i.geocode[0] + Math.random()}
            position={i.geocode}
            icon={myIcon}
            ref={ref => {
              // Store the reference to each marker individually
              if (ref) {
                markerRef.current.push(ref);
              }
            }}
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
        {console.log('Marker Ref:', markerRef.current)}
        {/* </MarkerClusterGroup> */}
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
      <div style={{ background: 'transparent' }}>
        {selectedPhoto ? (
          <div>
            <h3>Selected Photo</h3>
            <p>Image URL:</p>
            <img
              width="75%"
              src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`}
              alt={selectedPhoto.signatura}
            />
          </div>
        ) : (
          <p style={{ color: '#8c8d85' }}>No photo selected</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Map;
