// import React, { useEffect, useState, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';

// const myIcon = L.icon({
//   iconUrl: require('../assets/ikona.png'),
//   iconSize: [28, 28],
// });

// const Karta = () => {
//   const mapRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);
//   const [markerInstances, setMarkerInstances] = useState([]); // Store marker instances

//   useEffect(() => {
//     // Create a map instance and set it to the 'map-container' div
//     const osm = L.tileLayer(
//       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//       {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }
//     );

//     // Define Dark tile layer
//     const dark = L.tileLayer(
//       'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//       {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//         subdomains: 'abcd',
//         maxZoom: 19,
//       }
//     );

//     const mapInstance = L.map('map-container', {
//       center: [46.2, 16],
//       zoom: 13,
//       layers: [osm], // Default base layer
//       zoomControl: false,
//     });

//     // Add tile layers to the map after creating the map

//     const url1 =
//       'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';
//     const wmsLayer1 = L.tileLayer
//       .wms(url1, {
//         layers: 'tema_stanovnistvo',
//         format: 'image/png',
//         transparent: true,
//         version: '1.3.0',
//         attribution: 'WMS Service Attribution',
//       })
//       .addTo(mapInstance);

//     /*==============================================
//                 LAYER CONTROL
//     ================================================*/
//     const baseMaps = {
//       OSM: osm, // Use the defined osm tile layer here
//       Dark: dark,
//       // Add other base maps as needed
//     };
//     const overlayMaps = { Stanovništvo: wmsLayer1 };

//     // Create a control for layer switching
//     L.control
//       .layers(baseMaps, overlayMaps, { collapsed: false })
//       .addTo(mapInstance);

//     // Move the control container to a custom div and apply the custom CSS class
//     const customMapControls = document.getElementById(
//       'custom-map-controls'
//     );
//     const controlContainer = mapInstance
//       .getContainer()
//       .querySelector('.leaflet-control-layers');
//     controlContainer.classList.add('custom-control-container'); // Apply the custom CSS class
//     customMapControls.appendChild(controlContainer);

//     // Set the background color explicitly
//     controlContainer.style.backgroundColor = '#DBDBDB';

//     // Store the map instance in state and ref
//     setMap(mapInstance);
//     mapRef.current = mapInstance;

//     // Clean up when the component unmounts
//     return () => {
//       mapInstance.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (map && markers.length > 0) {
//       // Remove existing marker instances
//       markerInstances.forEach(marker => {
//         marker.removeFrom(map);
//       });

//       // Create new marker instances
//       const newMarkerInstances = markers.map(markerData => {
//         const marker = L.marker(markerData.latLng, {
//           icon: myIcon,
//         }).addTo(map);
//         marker.bindPopup(markerData.popupContent);
//         return marker;
//       });

//       setMarkerInstances(newMarkerInstances); // Store new marker instances
//     }
//   }, [map, markers]);

//   // Fetch marker data from your API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_SERVER}/json_photos`
//         );

//         const parsedData = response.data.map(item => {
//           const geo = JSON.parse(item.geometry);
//           return {
//             latLng: [geo.coordinates[1], geo.coordinates[0]],
//             popupContent: item.signatura,
//           };
//         });

//         setMarkers(parsedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleZoomIn = () => {
//     if (mapRef.current) {
//       mapRef.current.zoomIn();
//     }
//   };

//   const handleZoomOut = () => {
//     if (mapRef.current) {
//       mapRef.current.zoomOut();
//     }
//   };

//   return (
//     <div className="naslov-container">
//       <h1>opservatorij</h1>
//       <div className="line-div" />{' '}
//       <div
//         className="custom-control-container"
//         id="custom-map-controls"
//       ></div>
//       <button id="plus" onClick={handleZoomIn}>
//         +
//       </button>
//       <button id="minus" onClick={handleZoomOut}>
//         -
//       </button>
//       <div
//         id="map-container"
//         style={{ height: '400px', width: '60vw' }}
//       ></div>
//     </div>
//   );
// };

// export default Karta;
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
  const [markerInstances, setMarkerInstances] = useState([]); // Store marker instances

  useEffect(() => {
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
      layers: [osm], // Default base layer
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

    return () => {
      mapInstance.remove();
    };
  }, []);

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
            {markerData.popUp}
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
  }, [map, markers, markerInstances]); // Include markerInstances in the dependency array

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
          };
        });

        setMarkers(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      {' '}
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
      ></div>
    </div>
  );
};

export default Karta;
