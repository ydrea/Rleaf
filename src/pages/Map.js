import React, { useEffect, useState, useRef } from 'react';
import { Icon } from 'leaflet';
import {
  Marker,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
  ZoomControl,
} from 'react-leaflet';
import axios from 'axios';
import { useSelector } from 'react-redux';
// Define custom icon
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});

// Custom hook for fetching markers data
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
            id: item.id,
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

// Custom hook for controlling the map from outside
function useMapController(mapInstance) {
  const showLocationOnMap = (latitude, longitude) => {
    if (mapInstance) {
      const location = [latitude, longitude];
      mapInstance.setView(location, 10);

      // Find the marker by ID and open its popup
      const marker = markers.find(
        marker => marker.id === selectedPhoto.id
      );
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return showLocationOnMap;
}

export function Map() {
  const mapInstance = useRef(null);
  const markersData = useMarkersData();
  // Use useSelector to get the selectedPhoto from Redux store
  const selectedPhoto = useSelector(
    state => state.mapa.selectedPhoto
  );

  // Custom hook to control the map from outside
  const showLocationOnMap = useMapController(mapInstance.current);

  // Monitor changes to selectedPhoto and zoom the map
  useEffect(() => {
    if (selectedPhoto && mapInstance.current) {
      const geocode = [
        selectedPhoto.geom.coordinates[1],
        selectedPhoto.geom.coordinates[0],
      ];

      // Zoom the map to the location of the selected photo
      mapInstance.current.setView(geocode, 10); // Adjust the zoom level as needed
    }
  }, [selectedPhoto]);

  return (
    <div
      style={{ height: '80vh', width: '60vw', paddingLeft: '15vw' }}
    >
      <MapContainer
        whenCreated={map => (mapInstance.current = map)}
        center={[45.2, 16.2]}
        zoom={8}
        style={{ height: '80vh' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <LayersControl>
          <LayersControl.BaseLayer checked name="OSM">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>
          {/* Add more base layers and overlays here */}
        </LayersControl>
        {markersData.map((i, index) => (
          <Marker key={index} position={i.geocode} icon={myIcon}>
            <Popup>
              {i.popUp}
              {/* Add any content you want in the popup */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>{' '}
      <div style={{ background: 'transparent' }}>
        {selectedPhoto ? (
          <div>
            {selectedPhoto && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a
                  href={`#`}
                  onClick={() =>
                    showLocationOnMap(
                      selectedPhoto.latitude,
                      selectedPhoto.longitude
                    )
                  }
                >
                  View Selected Location
                </a>
              </div>
            )}{' '}
            <img
              width="75%"
              src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`}
              alt={selectedPhoto.signatura}
            />
          </div>
        ) : (
          <p style={{ color: 'black' }}>No photo selected</p>
        )}
      </div>
    </div>
  );
}
