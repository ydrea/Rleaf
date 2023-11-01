import 'leaflet/dist/leaflet.css';
import './karta.css';
import { Icon } from 'leaflet';
import { useRef, useEffect, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  useMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  ...L.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const center = [52.2295, 21.01];

const points = [
  {
    id: '1',
    lat: 52.2287,
    lng: 21.0068,
    title: 'Marker 1',
  },
  {
    id: '2',
    lat: 52.2292,
    lng: 21.0089,
    title: 'Marker 2',
  },
];

const latLngs = points.map(point => L.latLng(point.lat, point.lng));
console.log(latLngs);
//
const ListMarkers = ({ onItemClick, latLngs }) => {
  return (
    <div className="markersList">
      {points.map(({ title }, index) => (
        <div
          className="markerItem"
          key={index}
          onClick={e => {
            console.log(latLngs);
            e.preventDefault();
            onItemClick(index);
          }}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

const MyMarkers = ({ data, latLngs, selectedIndex }) => {
  return data.map((item, index) => (
    <PointMarker
      key={index}
      content={item.title}
      // center={latLngs[index]}
      center={{ lat: item.lat, lng: item.lng }}
      openPopup={selectedIndex === index}
    />
  ));
};

const PointMarker = ({ center, content, openPopup }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (openPopup) {
      map.flyToBounds([center]);
      markerRef.current.openPopup();
    }
  }, [map, center, openPopup]);

  return (
    <Marker ref={markerRef} position={center}>
      <Popup>{content}</Popup>
    </Marker>
  );
};

const MapWrapper = () => {
  const [selected, setSelected] = useState();

  function handleItemClick(index) {
    setSelected(index);
  }
  const { BaseLayer, Overlay } = LayersControl;

  return (
    <>
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '80vh' }}
      >
        <BaseLayer checked name="OSM">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        {/* <img src="distmarker-icon.png" alt="Marker Icon" />
        <img src="distmarker-shadow.png" alt="Marker Shadow" /> */}

        <MyMarkers
          selectedIndex={selected}
          data={points}
          latLngs={latLngs}
        />
      </MapContainer>

      <ListMarkers
        latLngs={latLngs}
        data={points}
        onItemClick={handleItemClick}
      />
      {markeri.map((i, index) => (
        <Marker
          key={i.geocode[0] + Math.random()}
          position={i.geocode}
          icon={myIcon}
          ref={ref => {
            if (ref) {
              markerRef.current.push(ref);
            }
          }}
        >
          <Popup>
            {i.popUp}
            {/* <Link to={{ pathname: `/photos/`+ `${i.popUp}` }}> */}
            <img
              width="233px"
              src={`${process.env.REACT_APP_SERVER_PUB}/thumbs/${i.popUp}`}
              alt={i.popUp}
              // onClick={()=> handleSelectPhoto(index) }
            />
            {/* </Link> */}
          </Popup>
        </Marker>
      ))}
      {/* {console.log('Marker Ref:', markerRef.current)} */}
      {/* </MarkerClusterGroup> */}
      {/* {lajeri.map(
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
        )} */}

      {/* <MyMarkers selectedIndex={selected} data={points} /> */}
    </>
  );
};

export default MapWrapper;

// You define the center and an array of points (markers) with latitude, longitude, and titles.

// ListMarkers component: This component is used to display a list of markers. When a marker in the list is clicked, it calls the onItemClick function with the index of the clicked marker.

// MyMarkers component: This component renders the markers on the map. It takes the data array and an index indicating the selected marker. When the selected marker changes, it updates the map and opens the popup for the selected marker.

// PointMarker component: This component renders a single marker on the map. It uses the useMap hook from react-leaflet to access the map instance, and it opens the popup when openPopup is true.

// MapWrapper component: This is the main component that wraps everything together. It sets up the map container with a center, zoom level, and a tile layer. It also passes the points data and the selected marker index to the MyMarkers component. When a marker in the list is clicked (handleItemClick function), the selected marker is updated.

// In summary, this code creates a map with markers and a corresponding list. Clicking on a marker in the list will focus the map on that marker and open its popup. The map is created using the react-leaflet library, which provides a set of React components for working with Leaflet maps.
