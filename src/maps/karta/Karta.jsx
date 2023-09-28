import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css';
import {
  Marker,
  GeoJSON,
  MapContainer,
  Popup,
  TileLayer,
  LayersControl,
  ZoomControl,
  WMSTileLayer,
} from 'react-leaflet';
import BetterWMS from "./BetterWMS";
import Hline from '../../comps/Line';
import { useRef, useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../comps/Footer';
import { useSelector } from 'react-redux';

import {
    ANaselja, PAJedinice,  PBNaselja, FiksniElementi,
    PodRH, TemaZP, TemaP, //TemaS
  } from '../wms';
//
const myIcon = new Icon({
    iconUrl: require('../../assets/Asset 5.svg'),
    iconSize: [28, 28],
  });
  
//
function Map() {
    const [markeri, markeriSet] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState();
    const markerRef = useRef([]);
  
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
//
  //and out
  const { BaseLayer, Overlay } = LayersControl;
  const temast = {
    id: '777',
    name: 'Stanovništvo',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_stanovnistvo",
    props: {
      version: "1.3",
      format: "image/png",
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: '0.8'
    }
  }
  const temakz = {
    id: '778',
    name: 'pokrov i korištenje zemljišta (CORINE)',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_koristenje_zemljista",
    props: {
      version: "1.1",
      format: "image/png",
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: '0.8'
    }
  }
// const wmsLayers = [
//     {
//     //   id: '777',
//       layers: ["tema_drvena_arhitektura","tema_potres", "tema_stanovnistvo", "tema_zastita_prirode", "tema_koristenje_zemljista", "preklop_banijska_naselja", "preklop_administrativne_jedinice"],
//       props: {
//         version: "1.3",
//         format: "image/png",
//         transparent: true,
//         tiles: true,
//         zIndex: 150,
//         uppercase: true,
//         opacity: '0.8'
//       }
//     },
//     // Add more wmsLayer objects for additional layers if needed
//   ];
  
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
      <Hline color="#18aa00" height="2px" width="100%" />
<div>
<MapContainer 
center={[45.2, 16.2]}
zoom={11}
style={{
    maxWidth: '75%',
  height: '80vh',
  marginLeft: '17.5%',
  marginRight: '12.5%',
}}
zoomControl={false}
>    
<ZoomControl position="bottomright" />
<LayersControl
          collapsed={false}
> 
<BaseLayer checked name="OSM">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
 
          <BaseLayer name="podloge_reljef_hidrologija">
            <PodRH />
          </BaseLayer>
          <FiksniElementi />


  {/* Overlays */}
  <Overlay key={temast.id} name={temast.name}>
    <BetterWMS
      key={temast.id}
      id={temast.id}
      url={temast.url}
      layers={temast.layers}
      {...temast.props}
    />
  </Overlay>
  <Overlay key={temakz.id} name={temakz.name}>
    <BetterWMS
      key={temakz.id}
      id={temakz.id}
      url={temakz.url}
      layers={temakz.layers}
      {...temakz.props}
    />
    </Overlay>

  </LayersControl>
 
</MapContainer>
 </div></div> );
}

export default Map;