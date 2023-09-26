import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './karta.css';
import Footer from '../comps/Footer';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import 'leaflet-sidebar-v2/css/leaflet-sidebar.min.css';
import 'leaflet-sidebar-v2/js/leaflet-sidebar.min.js';

import {
  selectSelectedPhoto,
  selectSelectedMarker,
  setSelectedPhoto,
  setSelectedMarker,
} from '../redux/rtk/mapSlice';

//
const myIcon = L.icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});

const Karta = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [markerInstances, setMarkerInstances] = useState([]);
  const selectedMark = useSelector(state => {
    return state?.mapslice?.selectedMarker;
  });

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
            {/* <Link
              to={{
                pathname: '/photos',
                params: markerData.signatura,
              }}
            > */}
            <img
              width="233px"
              src={`${process.env.REACT_APP_SERVER_PUB}/${markerData.signatura}`}
              alt={markerData.signatura}
            />
            {/* </Link> */}
          </div>
        );

        const popupHtml = ReactDOMServer.renderToString(popupContent);

        marker.bindPopup(popupHtml); // Bind the popup content
        // console.log(popupHtml);
        //markDown
        marker.on('click', () => {
          // Display the image in a modal or a designated area on your page
          const image = document.createElement('img');
          image.src = `${process.env.REACT_APP_SERVER_PUB}/${markerData.signatura}`;
          image.alt = markerData.signatura;
          // Append the image to a modal or a specific container
          const modalContainer =
            document.getElementById('modal-container');
          modalContainer.innerHTML = ''; // Clear previous content
          modalContainer.appendChild(image);
        });
        //

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
        center: [45.2, 16.2],
        zoom: 8,
        layers: [osm],
        zoomControl: true,
      });

      //base
      osm.addTo(mapInstance);

      const url1 =
        'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

      const temaS = L.tileLayer
        .wms(url1, {
          layers: 'tema_stanovnistvo',
          transparent: 'true',
          format: 'image/png',
        })
        .addTo(mapInstance);
      const temaP = L.tileLayer
        .wms(url1, {
          layers: 'tema_potres',
          transparent: 'true',
          format: 'image/png',
        })
        .addTo(mapInstance);
      const temaKZ = L.tileLayer
        .wms(url1, {
          layers: 'tema_koristenje_zemljista',
          transparent: 'true',
          format: 'image/png',
        })
        .addTo(mapInstance);
      const temaZP = L.tileLayer
        .wms(url1, {
          layers: 'tema_zastita_prirode',
          transparent: 'true',
          format: 'image/png',
        })
        .addTo(mapInstance);

      //baseMaps
      const baseMaps = {
        OSM: osm,
        Dark: dark,
      };

      //overlayMaps
      const overlayMaps = {
        Stanovništvo: temaS,
        Potres: temaP,
        'Korištenje zemljišta': temaKZ,
        'Zaštita prirode': temaZP,
      };

      // Create a new sidebar instance
      const sidebar = L.control.sidebar('sidebar', {
        position: 'right',
        autopan: true, // Enable autopan
        closeButton: true, // Show close button
      });

      // Add the sidebar to the map

      sidebar.addTo(mapInstance);

      // // Create a new sidebar instance
      // const sidebar = L.control.sidebar('sidebar', {
      //   position: 'right',
      //   autopan: true,
      //   closeButton: true,
      // });

      // Add the sidebar to the map
      sidebar.addTo(mapInstance);

      // Function to set content in the sidebar
      function setSidebarContent(content) {
        const sidebarElement = document.getElementById('sidebar'); // Replace 'sidebar' with your actual sidebar element ID
        sidebarElement.innerHTML = content;
      }

      // Example usage:
      const sidebarContent = `
  <h2>Map Layers</h2>
  <h3>Base Maps</h3>
  <input type="radio" name="baseMap" value="OSM" checked> OpenStreetMap (OSM)<br>
  <input type="radio" name="baseMap" value="Dark"> Dark Map<br>
  
  <h3>Overlay Maps</h3>
  <input type="checkbox" id="stanovnistvo"> Stanovništvo<br>
  <input type="checkbox" id="potres"> Potres<br>
  <input type="checkbox" id="koristenjeZemljista"> Korištenje zemljišta<br>
  <input type="checkbox" id="zastitaPrirode"> Zaštita prirode<br>
`;

      setSidebarContent(sidebarContent);

      /////////////////////////////////////////
      //       // Add an image to the sidebar
      //       sidebar.setContent(
      //         '<h2>Map Legend</h2><img src="legend.png" alt="Legend">'
      //       );
      //       // Create a custom widget and add it to the sidebar
      //       const customWidget = document.createElement('div');
      //       customWidget.innerHTML =
      //         '<h2>Custom Widget</h2><button onclick="customFunction()">Click Me</button>';
      //       sidebar.setContent(customWidget);

      //       // Add layer control elements to the sidebar
      //       sidebar.setContent(`
      // <h2>Map Layers</h2>
      // <h3>Base Maps</h3>
      // <input type="radio" name="baseMap" value="OSM" checked> OpenStreetMap (OSM)<br>
      // <input type="radio" name="baseMap" value="Dark"> Dark Map<br>

      // <h3>Overlay Maps</h3>
      // <input type="checkbox" id="stanovnistvo"> Stanovništvo<br>
      // <input type="checkbox" id="potres"> Potres<br>
      // <input type="checkbox" id="koristenjeZemljista"> Korištenje zemljišta<br>
      // <input type="checkbox" id="zastitaPrirode"> Zaštita prirode<br>
      // `);
      //       // Event listener for base map selection
      //       document
      //         .querySelectorAll('input[name="baseMap"]')
      //         .forEach(input => {
      //           input.addEventListener('change', function () {
      //             const selectedBaseMap = this.value;
      //             // Update the base map based on the selected option
      //             mapInstance.removeLayer(baseMaps['OSM']);
      //             mapInstance.removeLayer(baseMaps['Dark']);
      //             mapInstance.addLayer(baseMaps[selectedBaseMap]);
      //           });
      //         });

      //       // Event listeners for overlay layers
      //       document
      //         .getElementById('stanovnistvo')
      //         .addEventListener('change', function () {
      //           if (this.checked) {
      //             mapInstance.addLayer(overlayMaps['Stanovništvo']);
      //           } else {
      //             mapInstance.removeLayer(overlayMaps['Stanovništvo']);
      //           }
      //         });

      //       document
      //         .getElementById('potres')
      //         .addEventListener('change', function () {
      //           if (this.checked) {
      //             mapInstance.addLayer(overlayMaps['Potres']);
      //           } else {
      //             mapInstance.removeLayer(overlayMaps['Potres']);
      //           }
      //         });

      //       document
      //         .getElementById('koristenjeZemljista')
      //         .addEventListener('change', function () {
      //           if (this.checked) {
      //             mapInstance.addLayer(overlayMaps['Korištenje zemljišta']);
      //           } else {
      //             mapInstance.removeLayer(
      //               overlayMaps['Korištenje zemljišta']
      //             );
      //           }
      //         });

      //       document
      //         .getElementById('zastitaPrirode')
      //         .addEventListener('change', function () {
      //           if (this.checked) {
      //             mapInstance.addLayer(overlayMaps['Zaštita prirode']);
      //           } else {
      //             mapInstance.removeLayer(overlayMaps['Zaštita prirode']);
      //           }
      //         });
      //       // Create a Leaflet popup
      //       const popup = L.popup({
      //         closeButton: false,
      //         autoClose: false,
      //       }).setContent(
      //         '<h2>Map Information</h2><p>This is a map of...</p>'
      //       );

      //       // Bind the popup to a specific marker or map location
      //       popup.addTo(mapInstance);

      ///////////////////////////////

      // Define a custom function for the button
      function customFunction() {
        // Your custom functionality here
      }

      // // Create a custom sidebar tab with the layer control
      // const layerTabContent = '<h2>Layers</h2>';
      // const layerControlDiv = document.createElement('div');
      // layerControlDiv.innerHTML = layerTabContent;

      // Create the layer control and add it to the custom tab
      // const layerControl = L.control.layers(baseMaps, overlayMaps, {
      //   collapsed: false,
      // });
      // layerControl.addTo(layerControlDiv);

      // // Add the custom tab to the sidebar
      // sidebar.addPanel({
      //   id: 'layerTab',
      //   tab: '<i class="fas fa-layer-group"></i>',
      //   pane: layerControlDiv,
      //   title: 'Layers',
      // });

      // const customMapControls = document.getElementById(
      //   'custom-map-controls'
      // );

      // const controlContainer = mapInstance
      //   .getContainer()
      //   .querySelector('.leaflet-control-layers');
      // controlContainer.classList.add('custom-control-container');
      // customMapControls.appendChild(controlContainer);
      // controlContainer.style.backgroundColor = '#DBDBDB';

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
  //
  const triggerMarkerClick = signatura => {
    if (map && markers.length > 0) {
      // Find the marker instance with the matching signatura
      const targetMarker = markerInstances.find(
        marker => marker.options.popupContent === signatura
      );
      console.log(targetMarker);
      if (targetMarker) {
        // Programmatically trigger a click event on the marker
        targetMarker.fire('click');
      } else {
        console.log(`Marker with signatura ${signatura} not found.`);
      }
    }
  };

  // Create a useEffect to listen for changes in selectedMark
  useEffect(() => {
    if (selectedMark) {
      // Call the function to trigger marker click with
      console.log('aaaaaaaaa', selectedMark);
      triggerMarkerClick(selectedMark);
    }
  }, [selectedMark]);

  //
  return (
    <div className="gallery">
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />
      </div>
      <div className="txtcont">
        Dobrodošli na interaktivnu kartu "Opservatorija krajobraza".
        Ova karta predstavlja našu kontinuirano nadopunjujuću
        kolekciju georeferenciranih podataka koja vam omogućuje uvid u
        različite aspekte krajobraza. Upotrijebite alate za odabir
        podloge, prilagodbu slojeva i filtriranje informacija kako
        biste prilagodili prikaz prema vlastitim istraživačkim
        potrebama.
      </div>
      {/* <div
        className="custom-control-container"
        id="custom-map-controls"
      >
        <button id="plus" onClick={handleZoomIn}>
          +
        </button>
        <button id="minus" onClick={handleZoomOut}>
          -
        </button>
      </div> */}
      <div
        id="map-container"
        style={{
          height: '400px',
          width: '75vw',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '2vh',
        }}
      />
      <div id="modal-container"></div>
      <Footer />{' '}
    </div>
  );
};

export default Karta;
