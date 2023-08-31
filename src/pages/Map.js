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

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card } from '../comps/Card';
import Footer from '../comps/Footer';

import { useDispatch } from 'react-redux';
import { setSelectedMarker } from '../redux/rtk/mapSlice';

//
export const Map = () => {
  const [clickedPhoto, setClickedPhoto] = useState(null);
  const [markeri, markeriSet] = useState([]);
  const dispatch = useDispatch();
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
  };

  // map ref
  const mapRef = useRef(null);

  //center, coords
  const [selectedMarkerCoords, setSelectedMarkerCoords] =
    useState(null);
  const [centerMapOnMarker, setCenterMapOnMarker] = useState(false);

  //prog. zoom
  const mapCenter =
    centerMapOnMarker && selectedMarkerCoords
      ? selectedMarkerCoords
      : [45.2, 16.2];
  const mapZoom = centerMapOnMarker && selectedMarkerCoords ? 14 : 9;

  return (
    <div style={{ height: '70vh', width: '140vh' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '80vh' }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* markeri     */}
        {markeri.map(i => (
          <Marker
            key={i.geocode[0] + Math.random()}
            position={i.geocode}
            icon={myIcon}
          >
            // ...
            <Popup>
              {i.popUp}
              <Link
                to={`/photos/${i.popUp}`}
                onClick={event => {
                  event.preventDefault(); // Prevent the default link behavior
                  handlePhotoClick(i); // Call your handler function
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
      {clickedPhoto && <Card photo={clickedPhoto.photoData} />}
      <Footer />
    </div>
  );
};
