import geojson from '../data/temakz.geojson.json';
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CustomCtrl from '../comps/CustomCtrl';
import { useDispatch } from 'react-redux';

const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//

//temaKZ
function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.code_opis);
}

export const Mapa = ({ selectPhotoIndex }) => {
  //prog. zoom
  const [selectedMarkerCoords, setSelectedMarkerCoords] =
    useState(null);
  const [centerMapOnMarker, setCenterMapOnMarker] = useState(false);

  const mapRef = useRef(null); // Define a ref for the MapContainer
  const markerClusterRef = useRef(null);
  //
  const mapCenter =
    centerMapOnMarker && selectedMarkerCoords
      ? selectedMarkerCoords
      : [45.2, 16.2];
  const mapZoom = centerMapOnMarker && selectedMarkerCoords ? 12 : 21;

  // const handleMapCreated = mapInstance => {
  //   if (centerMapOnMarker && selectedMarkerCoords) {
  //     mapInstance.setView(selectedMarkerCoords, mapZoom);
  //   }
  // };

  // ...

  const [lajeri, lajeriSet] = useState([
    { name: 't1', visible: true },
    { name: 't2', visible: false },
  ]);
  //
  // const [data, setData] = useState(null);
  const [markeri, markeriSet] = useState([]);
  //ex
  const onLayerToggle = layerName => {
    lajeriSet(prevLayers =>
      prevLayers.map(layer =>
        layer.name === layerName
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };
  //from gallery/
  const { popUp, signatura } = useParams();

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

  //prog

  useEffect(() => {
    if (signatura && markeri.length > 0) {
      const selectedMarker = markeri.find(
        marker => marker.popUp === signatura
      );
      if (selectedMarker) {
        setSelectedMarkerCoords(selectedMarker.geocode);
        setCenterMapOnMarker(true);
      }
    }
  }, [signatura, markeri]);

  // useEffect(() => {
  //   if (centerMapOnMarker && selectedMarkerCoords) {
  //     if (markerClusterRef.current) {
  //       const closestMarkerIndex = findClosestMarker(
  //         selectedMarkerCoords,
  //         markeri
  //       );
  //       if (closestMarkerIndex !== -1) {
  //         const markerToClick =
  //           markerClusterRef.current._childMarkerContext.childMarkers[
  //             closestMarkerIndex
  //           ];
  //         if (markerToClick) {
  //           markerToClick.openPopup();
  //           mapRef.current.leafletElement.setView(
  //             selectedMarkerCoords,
  //             mapZoom
  //           );
  //         }
  //       }
  //     }
  //     setCenterMapOnMarker(false);
  //   }
  // }, [centerMapOnMarker, selectedMarkerCoords, markeri, mapZoom]);

  //

  //
  const { BaseLayer, Overlay } = LayersControl;

  return (
    <div style={{ height: '70vh', width: '140vh' }}>
      <CustomCtrl layers={lajeri} onLayerToggle={onLayerToggle} />
      <MapContainer
        center={mapCenter}
        zoom={8}
        style={{ height: '80vh' }}
        // whenCreated={handleMapCreated}
        ref={mapRef} // Add a ref to the MapContainer
      >
        {' '}
        <LayersControl>
          <BaseLayer checked name="OSM">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer name="reljef">
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
          </LayersControl>
        </LayersControl>
        {/* {data && <GeoJSON data={data} />} */}
        <MarkerClusterGroup>
          {markeri.map(i => (
            <Marker
              key={i.geocode[0] + Math.random()}
              position={i.geocode}
              icon={myIcon}
            >
              <Popup>
                {i.popUp}
                <Link to={`/photos/${i.popUp}`}>
                  <img
                    width="233px"
                    src={`${process.env.REACT_APP_SERVER_PUB}/${i.popUp}`}
                    alt={i.popUp}
                  />
                </Link>
              </Popup>
            </Marker>
          ))}
          {showMapPopup && selectedMarkerCoords && (
            <Marker position={selectedMarkerCoords} icon={myIcon}>
              <Popup>
                {selectedPhoto && selectedPhoto.popUp}
                <Link
                  to={`/photos/${
                    selectedPhoto && selectedPhoto.popUp
                  }`}
                >
                  <img
                    width="233px"
                    src={`${process.env.REACT_APP_SERVER_PUB}/${
                      selectedPhoto && selectedPhoto.popUp
                    }`}
                    alt={selectedPhoto && selectedPhoto.popUp}
                  />
                </Link>
              </Popup>
            </Marker>
          )}
          {selectedPhotoIndex !== null && (
            <Marker position={selectedMarkerCoords} icon={myIcon}>
              <Popup>{selectedMarkerCoords}</Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
