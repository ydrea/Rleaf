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
  const adminna = {
    id: '775',
    name: 'administrativne jedinice',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "preklop_administrativne_jedinice",
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

  const selaiz = {
    id: '776',
    name: 'sela i zaseoci',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "preklop_banijska_naselja",
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
  const temast = {
    id: '777',
    name: 'broj stanovnika',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_stanovnistvo",
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

  const temazp = {
    id: '779',
    name: 'zaštita prirode',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "zastita_prirode",
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
  const temap = {
    id: '780',
    name: '  potres 2020: intenzitet (MMI/MCS)',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_potres",
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
  
  const temada = {
    id: '781',
    name: 'drvena arhitektura',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_drvena_arhitektura",
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
//   ];
  
  return (
    <div className="gallery">
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />
      </div>
      <div style= {{
      marginLeft: '17.5%',
      marginRight: '12.5%',
      }}>
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
  width: '100%',
  height: '80vh',
  
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
  <Overlay key={adminna.id} name={adminna.name}>
    <BetterWMS
      key={adminna.id}
       id={adminna.id}
      url={adminna.url}
   layers={adminna.layers}
       {...adminna.props}
    />
  </Overlay>
  <Overlay key={selaiz.id} name={selaiz.name}>
    <BetterWMS
      key={selaiz.id}
       id={selaiz.id}
      url={selaiz.url}
   layers={selaiz.layers}
       {...selaiz.props}
    />
  </Overlay>
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
  <Overlay key={temazp.id} name={temazp.name}>
    <BetterWMS
      key={temazp.id}
      id={temazp.id}
      url={temazp.url}
      layers={temazp.layers}
      {...temazp.props}
    />
    </Overlay>
    <Overlay key={temap.id} name={temap.name}>
    <BetterWMS
      key={temap.id}
      id={temap.id}
      url={temap.url}
      layers={temap.layers}
      {...temap.props}
    />
    </Overlay>

    <Overlay key={temada.id} name={temada.name}>
    <BetterWMS
      key={temada.id}
       id={temada.id}
      url={temada.url}
   layers={temada.layers}
       {...temada.props}
    />
    </Overlay>
  </LayersControl>
 
</MapContainer>
 </div></div> );
}

export default Map;