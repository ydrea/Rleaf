import 'leaflet/dist/leaflet.css';
import { Icon, L } from 'leaflet';
//prettier-ignore
import {  Marker, GeoJSON, MapContainer, Popup, TileLayer, LayersControl, 
    WMSTileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import LeafletWms from 'leaflet.wms';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const UseMap = () => {
  const [data, setData] = useState(null);
  const mapb = useMap();
  console.log('map center:', mapb.getCenter());
  // const layerSrc = LeafletWms.source(
  //   'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326'
  // );
  // layerSrc.getLayer({ layer: 'fiksno_drzavna_granica' }).addTo(mapb);

  //prettier-ignore
  useEffect(()=>{axios.get(

    'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_granice_banije&outputFormat=application/json&srsName=epsg:4326'
  
  )
  .then(response => {
    setData(response.data); // Assuming the response contains the GeoJSON data
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching WFS data:', error);
  });
},[])

  return <>{data && <GeoJSON data={data} />}</>;
};

//prettier-ignore
const markers = [
    { geocode: [45.2, 16.2], popUp: 'medo?'},
    { geocode: [45.22, 16.25], popUp: 'zeko!'},
    // { geocode: [45.21, 16.24], popUp: 'kravicaa!'},
  ];
//
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//

//&TYPENAME=fiksno_granice_banije
//&TYPENAME=fiksno_drzavna_granica

export const Mapb = () => {
  //
  return (
    <div>
      <MapContainer
        center={[45.2, 16.2]}
        zoom={8}
        style={{ height: '80vh' }}
      >
        <LayersControl>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <UseMap />
        </LayersControl>

        <MarkerClusterGroup>
          {markers.map(i => (
            <Marker position={i.geocode} icon={myIcon}>
              <Popup>{i.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
