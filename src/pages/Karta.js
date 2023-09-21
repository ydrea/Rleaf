import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './karta.css';

const Karta = () => {
  const mapRef = useRef(null); // Create a ref to store the map instance

  useEffect(() => {
    // Define OpenStreetMap tile layer
    const osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    // Define Dark tile layer
    const dark = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    );

    // Create the map
    const map = L.map('map-container', {
      center: [46.2, 16],
      zoom: 13,
      layers: [osm], // Default base layer
      zoomControl: false,
    });

    // Store the map instance in the ref
    mapRef.current = map;

    // Add tile layers to the map after creating the map
    osm.addTo(map);

    /*==============================================
                    LAYER CONTROL
    ================================================*/
    const baseMaps = {
      OSM: osm, // Use the defined osm tile layer here
      Dark: dark,
      // Add other base maps as needed
    };

    // Create an empty overlayMaps object if you don't have overlay layers
    const overlayMaps = {};

    // Create a control for layer switching
    L.control
      .layers(baseMaps, overlayMaps, { collapsed: false })
      .addTo(map);

    // Move the control container to a custom div and apply the custom CSS class
    const customMapControls = document.getElementById(
      'custom-map-controls'
    );
    const controlContainer = map
      .getContainer()
      .querySelector('.leaflet-control-layers');
    controlContainer.classList.add('custom-control-container'); // Apply the custom CSS class
    customMapControls.appendChild(controlContainer);

    // Set the background color explicitly
    controlContainer.style.backgroundColor = '#DBDBDB';

    return () => {
      map.remove();
    };
  }, []);

  // State for managing zoom level
  const [zoomLevel, setZoomLevel] = useState(13); // Set the initial zoom level

  useEffect(() => {
    // Update the map's zoom level when zoomLevel state changes
    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevel);
    }
  }, [zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => prevZoom + 1);
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 1, 1)); // Ensure zoom level doesn't go below 1
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // marginLeft: '22vw',
      }}
    >
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div" />
        {/* <p>
          Interdisciplinarna platforma posvećena istraživanju i
          razumijevanju krajobraza
        </p> */}
      </div>
      <div style={{ marginLeft: '22vw' }}>
        <div className="cntrl" id="custom-map-controls"></div>

        <button id="plus" onClick={handleZoomIn}>
          +
        </button>
        <button id="minus" onClick={handleZoomOut}>
          -
        </button>

        <div
          id="map-container"
          style={{ height: '400px', width: '60vw' }}
        ></div>
      </div>
    </div>
  );
};

export default Karta;
