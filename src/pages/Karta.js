import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './karta.css';

const myIcon = L.icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});

const Karta = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [markerInstances, setMarkerInstances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/json_photos`
        );

        const parsedData = response.data.map(item => {
          const geo = JSON.parse(item.geometry);
          return {
            latLng: [geo.coordinates[1], geo.coordinates[0]],
            popupContent: item.signatura,
            signatura: item.signatura, // Include signatura
          };
        });

        setMarkers(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  useEffect(() => {
    if (map && markers.length > 0) {
      // Remove existing marker instances
      markerInstances.forEach(marker => {
        marker.remove();
      });

      // Create new marker instances
      const newMarkerInstances = markers.map(markerData => {
        const marker = L.marker(markerData.latLng, {
          icon: myIcon,
        });
        const popupContent = (
          <div>
            {markerData.popupContent}
            <Link
              to={{
                pathname: '/photos',
                params: markerData.signatura,
              }}
            >
              <img
                width="233px"
                src={`${process.env.REACT_APP_SERVER_PUB}/${markerData.signatura}`}
                alt={markerData.signatura}
              />
            </Link>
          </div>
        );

        marker.bindPopup(popupContent); // Bind the popup content

        marker.addTo(map);
        return marker;
      });

      setMarkerInstances(newMarkerInstances);
    }
  }, [map, markers]); // Re-render markers when map or markers change

  useEffect(() => {
    if (!mapRef.current) {
      // Create the map instance when mapRef is not available
      const osm = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );
      const dark = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      );
      const mapInstance = L.map('map-container', {
        center: [46.2, 16],
        zoom: 13,
        layers: [osm],
        zoomControl: false,
      });

      osm.addTo(mapInstance);

      const url1 =
        'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';
      const wmsLayer1 = L.tileLayer
        .wms(url1, {
          layers: 'tema_stanovnistvo',
          format: 'image/png',
          transparent: true,
          version: '1.3.0',
          attribution: 'WMS Service Attribution',
        })
        .addTo(mapInstance);

      const baseMaps = {
        OSM: osm,
        Dark: dark,
      };

      const overlayMaps = { Stanovništvo: wmsLayer1 };

      L.control
        .layers(baseMaps, overlayMaps, { collapsed: false })
        .addTo(mapInstance);

      const customMapControls = document.getElementById(
        'custom-map-controls'
      );
      const controlContainer = mapInstance
        .getContainer()
        .querySelector('.leaflet-control-layers');
      controlContainer.classList.add('custom-control-container');
      customMapControls.appendChild(controlContainer);
      controlContainer.style.backgroundColor = '#DBDBDB';

      setMap(mapInstance);
      mapRef.current = mapInstance;
    }
  }, []); // Create map when the component mounts

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  return (
    <div className="gallery">
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />
      </div>
      <div
        className="custom-control-container"
        id="custom-map-controls"
      >
        <button id="plus" onClick={handleZoomIn}>
          +
        </button>
        <button id="minus" onClick={handleZoomOut}>
          -
        </button>
      </div>
      <div
        id="map-container"
        style={{ height: '400px', width: '60vw' }}
      />
    </div>
  );
};

export default Karta;
