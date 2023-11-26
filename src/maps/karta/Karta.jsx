// import 'leaflet/dist/leaflet.css'
import './karta.css'
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
  useMap
} from 'react-leaflet';
import BetterWMS from "./BetterWMS";
import Hline from '../../comps/Line';
import { useRef, useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import axios from 'axios';
import extractLatLongFromJSON from './latlngParse'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../comps/Footer';
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedPhoto, setSelectedPhotoIndex, setSelectedPhoto, selectPhotos, 
  getPhotos } from '../../redux/rtk/gallerySlice';

import {ReactComponent as ico} from '../../assets/logo.svg'

import "react-tabs/style/react-tabs.css";
import {
    ANaselja, PAJedinice,  PBNaselja, FiksniElementi,
    PodRV, PodRvi, PodRd, PodK, TemaZP, TemaP, //TemaS
  } from '../wms';

  //fly  

  const points = [
    {
      id: '1',
      lat: 45.22284,
      lng: 16.21003,
      title: 'Marker 1',
    },
    {
      id: '2',
      lat: 45.22292,
      lng: 16.00897,
      title: 'Marker 2',
    },    
  ];
  
  const ListMarkers = ({ onItemClick }) => {
    return (
      <div className='markersList'>
        {points.map(({ title }, index) => (
          <div
            className='markerItem'
            key={index}
            onClick={e => {
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
  
  const MyMarkers = ({ data, selectedIndex }) => {
    return data.map((item, index) => (
      <PointMarker
        key={index}
        content={item.title}
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
    
  //icon
const myIcon = new Icon({
    iconUrl: ico, 
    // require('../../assets/icon.png'),
    iconSize: [28, 28],
  });
  
//
// MAP
//
  

function Map() {
    const [markeri, markeriSet] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState();
    const markerRef = useRef([]);
const navigate = useNavigate()
    const photos = useSelector(selectPhotos);  
    const [selected, setSelected] = useState();
    const [showPhoto, showPhotoSet] = useState(false);
  const dispatch = useDispatch(); 
const selectedPhoto = useSelector(selectSelectedPhoto);
  const parram = useParams();
  const map = useMap();
  //
  useEffect(() => {
    JSON.stringify(parram)
    console.log(parram);
    if (selectedPhoto) {
      const centerZoom = selectedPhoto.geom
      console.log(centerZoom);
      map.flyToBounds(centerZoom)
    }
  }, [parram])
  
// 
  //
  const handleSelectPhoto = index => {
    const originalIndex = photos.indexOf(markeri[index]);
    
    if (originalIndex !== -1) {
      // Check if the object exists before accessing the 'popUp' property
      const photo = photos[originalIndex];
      if (photo && photo.popUp) {
        dispatch(setSelectedPhotoIndex(originalIndex));
        showPhotoSet(true);
        navigate(`/photos/${photo.popUp}#imgcnt`);
      } else {
        console.error('Invalid photo data:', photo);
      }
    } else {
      console.error('Original index not found:', originalIndex);
    }
  };
  
  //
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

//
  function handleItemClick(index) {
    setSelected(index);
  }

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

        const coordinates = extractLatLongFromJSON(geo);

        if (
          coordinates &&
          coordinates.latitude &&
          coordinates.longitude
        ) {
          console.log('Latitude:', coordinates.latitude);
          console.log('Longitude:', coordinates.longitude);

          return {
            popUp: item.signatura,
            geocode: [coordinates.latitude, coordinates.longitude],
          };
        } else {
          console.error('Invalid JSON or missing coordinates:', geo);
          return null;
        }
      });

      const filteredData = parsedData.filter(item => item !== null);

      markeriSet(filteredData);
      return filteredData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // fetchData();
}, []);
//
  //and out
  const { BaseLayer, Overlay } = LayersControl;
//
const temastr = {
  id: '771',
  name: 'demografski trend 2011-2021',
  url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_stanovnisto_11_21_trend",
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

//
const temadgu = {
  id: '772',
  name: 'udio drvene arhitekture',
  url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_drv_gradnja_udio",
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


//
const gradovirh = {
  id: '773',
  name: 'gradovi RH',
  url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "preklop_gradoviRH",
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

//
const vode = {
  id: '774',
  name: 'vode',
  url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "preklop_vode",
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
//
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
//
  const selaiz = {
    id: '776',
    name: 'naselja i zaseoci Banovine/Banije',
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
    name: 'broj stanovnika 2021',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_stanovnistvo_2021",
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
    name: 'poljop. korištenje zemljišta (CORINE)',
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
    name: 'zaštićeni dijelovi prirode',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "tema_zastita_prirode",
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
  
  const temadz = {
    id: '781',
    name: 'drvene zgrade',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "preklop_drvene_zgrade",
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
  const temafk = {
    id: '782',
    name: 'FOTOTEKA',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
layers: "preklop_foto_katalog",
    props: {
      version: "1.1",
      format: "image/png",
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: '0.8',
      // maxZoom: 8
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
<section>      
  <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />
      </div>
      <div className='kartxt'>
        Dobrodošli na interaktivnu kartu "Opservatorija krajobraza".
        Ova karta predstavlja našu kontinuirano nadopunjujuću
        kolekciju georeferenciranih podataka koja vam omogućuje uvid u
        različite aspekte krajobraza. Upotrijebite alate za odabir
        podloge, prilagodbu slojeva i filtriranje informacija kako
        biste prilagodili prikaz prema vlastitim istraživačkim
        potrebama.
      </div>
      </section>
       
      <section>    
      <Hline color="#18aa00" height="2px" width="100%" />
 
<MapContainer 
center={[45.2, 16.2]}
zoom={11}
style={{
  width: '100%',
  height: '90vh',
  cursor: 'crosshair'
  
}}
zoomControl={false}
> 
<ZoomControl position="bottomright" />
<LayersControl
          collapsed={false}
>
<BaseLayer name="topografija">
            <PodK />
          </BaseLayer> 
<BaseLayer  name="reljef">
            <PodRV/>          
          </BaseLayer>
<BaseLayer name="reljef (visine)">
            <PodRvi />
          </BaseLayer>
<BaseLayer name="reljef (tamni)">
            <PodRd />
          </BaseLayer>
<BaseLayer checked name="OSM">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
<FiksniElementi />

  {/* Search */}

          {/* <Search provider={new OpenStreetMapProvider()} style={{zIndex: 1111}} /> */}


  {/* Overlays */}
  <Overlay key={gradovirh.id} name={gradovirh.name}>
    <BetterWMS
      key={gradovirh.id}
       id={gradovirh.id}
      url={gradovirh.url}
   layers={gradovirh.layers}
       {...gradovirh.props}
    />
  </Overlay>  <Overlay key={adminna.id} name={adminna.name}>
    <BetterWMS
      key={adminna.id}
       id={adminna.id}
      url={adminna.url}
   layers={adminna.layers}
       {...adminna.props}
    />
  </Overlay>  <Overlay key={vode.id} name={vode.name}>
    <BetterWMS
      key={vode.id}
       id={vode.id}
      url={vode.url}
   layers={vode.layers}
       {...vode.props}
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
    <Overlay key={temast.id} name={temast.name}>
    <BetterWMS
      key={temast.id}
       id={temast.id}
      url={temast.url}
   layers={temast.layers}
       {...temast.props}
    />
  </Overlay>
  <Overlay key={temastr.id} name={temastr.name}>
    <BetterWMS
      key={temastr.id}
       id={temastr.id}
      url={temastr.url}
   layers={temastr.layers}
       {...temastr.props}
    />
  </Overlay>

    <Overlay key={temadz.id} name={temadz.name}>
    <BetterWMS
      key={temadz.id}
       id={temadz.id}
      url={temadz.url}
   layers={temadz.layers}
       {...temadz.props}
    />
    </Overlay>
    <Overlay key={temadgu.id} name={temadgu.name}>
    <BetterWMS
      key={temadgu.id}
       id={temadgu.id}
      url={temadgu.url}
   layers={temadgu.layers}
       {...temadgu.props}
    />
    </Overlay>
    <Overlay key={temafk.id} name={temafk.name}>
    <BetterWMS
      key={temafk.id}
       id={temafk.id}
      url={temafk.url}
   layers={temafk.layers}
       {...temafk.props}
    />
    </Overlay>
      </LayersControl>
    </MapContainer>
    {/* {markeri.map((i) => (
            <Marker
              key={i.geocode[0] + Math.random()}
              position={i.geocode}
              icon={myIcon}
            >
              <Popup>
                {i.popUp}
                <img
                  width="250px"
                  src={`${process.env.REACT_APP_SERVER_PUB}/thumbs/${i.popUp}`}
                  alt={i.popUp}
                />
              </Popup>
            </Marker>
          ))} */}
</section>
      <Hline color="#7e7e77" height="2px" width="100%" /> <Footer/>      
      <section>
{/* <ListMarkers data={points} onItemClick={handleItemClick} /> */}

 {/* <Footer/> */}
  
 </section>
 </div> );
}

export default Map;