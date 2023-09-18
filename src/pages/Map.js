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
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useRef, useEffect, useState } from 'react';
import { Icon } from 'leaflet';
//prettier-ignore
import {
  ANaselja, PAJedinice,  PBNaselja, FiksniElementi,
  PodRH, TemaZP, TemaP, TemaS
} from '../maps/wms';
// import { markeri } from '../maps/markeri';

import chroma from 'chroma-js'; // Import Chroma.js
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { transition } from '../transition';
import CustomCtrl from '../comps/CustomCtrl';
// import CustomZoom from '../comps/CustomZoom';
import Legend from './Legend';

import Footer from '../comps/Footer';
import './mapa.css';
//

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedPhoto } from '../redux/rtk/mapSlice'; // Import the action

// foto layer
//prettier-ignore

const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//
//temaKZ
function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}

//
export default function Map() {
  const [lajeri, lajeriSet] = useState([
    { name: 't1', visible: true },
    { name: 't2', visible: false },
  ]);
  //
  const [markeri, markeriSet] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState();

  // const mapRef = useRef();
  const markerRef = useRef([]);
  //
  const geojsonData = geojson; // Assign the imported GeoJSON directly
  // Extract unique 'code_opis' values from your GeoJSON data
  const uniqueCodeOpisValues = [
    ...new Set(
      geojsonData.features.map(
        feature => feature.properties.code_opis
      )
    ),
  ];

  // Generate 6 random color codes
  const randomColorCodes = Array.from({ length: 6 }, () =>
    chroma.random().hex()
  );

  // Create a color mapping for 'code_opis' values
  const colorMapping = {};
  uniqueCodeOpisValues.forEach((codeOpis, index) => {
    colorMapping[codeOpis] = randomColorCodes[index];
  });
  function getColor(feature) {
    return colorMapping[feature.properties.code_opis];
  }

  //show on map
  const { signatura } = useParams(); // Get the photoId from the URL parameter
  const [shouldZoomAndClick, setShouldZoomAndClick] = useState(false);

  const selectedPhoto = useSelector(
    state => state.mapa.selectedPhoto
  );

  //ajeeee

  // Inside your component

  useEffect(() => {
    console.log('Selected Photo:', selectedPhoto);
    if (selectedPhoto && mapRef.current) {
      // Rest of the zooming and popup code
    }
  }, [selectedPhoto]);

  useEffect(() => {
    if (selectedPhoto) {
      const geocode = [
        selectedPhoto.geom.coordinates[1],
        selectedPhoto.geom.coordinates[0],
      ];

      // Zoom the map to the location of the selected photo
      mapRef.current.setView(geocode, 11);
    }
  }, [selectedPhoto]);

  //external control
  const onLayerToggle = layerName => {
    lajeriSet(prevLayers =>
      prevLayers.map(layer =>
        layer.name === layerName
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };
  //toggle popup

  //
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

  //deep inside

  // Set up an event listener for base layer changes
  const handleBaseLayerChange = e => {
    setSelectedLayer(e.name);
  };
  // Deep inside your useEffect
  useEffect(() => {
    // const fetchLegend = async () => {
    // const map = mapRef.current;
    if (selectedLayer) {
      console.log(selectedLayer);
      //   setSelectedLayer(e.name);
      // }
    }

    // fetchLegend();
  }, [selectedLayer]);

  //and out
  const { BaseLayer, Overlay } = LayersControl;

  return (
    <div
    // style={{
    //   height: '80vh',
    //   width: '60vw',
    //   paddingLeft: '15vw',
    // }}
    >
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div" />
        <p>
          Interdisciplinarna platforma posvećena istraživanju i
          razumijevanju krajobraza
        </p>
      </div>
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
        {selectedLayer && (
          <Legend
            styles={{
              position: 'fixed',
              top: '20',
              right: '0',
              zIndex: '5555',
            }}
            selectedLayer={selectedLayer}
          />
        )}
        <LayersControl onChange={handleBaseLayerChange}>
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
            <GeoJSON
              data={geojsonData}
              style={feature => ({
                fillColor: getColor(feature, colorMapping),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.8,
              })}
              onEachFeature={(feature, layer) => {
                // Bind popup to each feature
                layer.bindPopup(feature.properties.code_opis);
              }}
            />

            {/*             
            <BaseLayer name="tema_koristenje_zemljista">
              <GeoJSON data={geojson} onEachFeature={onEachFeature} />
            </BaseLayer> */}
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
// export default Mapa;
