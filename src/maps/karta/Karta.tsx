import { MapContainer, TileLayer, LayersControl, ZoomControl } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
import type { LayersControlEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-tabs/style/react-tabs.css'

import type { Photo } from '../../types/types'
import type { RootState } from '../../redux/store'
import { layers } from './constants'
import { BetterWMS } from './components/BetterWMS/BetterWMS'
import { getPhotos } from '../../redux/rtk/gallerySlice'
import { SingleMarker } from './components/SingleMarker/SingleMarker'
import { useAppDispatch } from '../../redux/hooks'
import { useWindowWidth } from '../../services/use-window-width/use-window-width'
import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import './Karta.sass'
import { useViewportSize } from '@mantine/hooks'
// import { MapLegends } from './components/Legends'
// import {WmsDebug} from './../WmsDebug'
import { CustomLayersControl } from './components/CustomLayersControl'

const LayerHandler = ({ 
  kartografijeSet, 
  onLayersChange 
}: { 
  kartografijeSet: (url: string) => void;
  onLayersChange: (activeLayers: Set<string>) => void;
}) => {
  const map = useMap();

  useEffect(() => {

    const activeLayers = new Set<string>();

    const handleBaseLayerChange = (e: LayersControlEvent) => {
      if (e.name === 'reljef') {
        kartografijeSet('https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png')
      } else {
        kartografijeSet('https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png')
      }
    }

// Legends handling
const handleOverlayChange = (e: any) => {
  const layerId = e.layer.options.id;   // capture the correct ID

  if (e.type === 'overlayadd') {
    activeLayers.add(layerId);
  } else if (e.type === 'overlayremove') {
    activeLayers.delete(layerId);
  }
  onLayersChange(new Set(activeLayers));
};

 // Set up event listeners
    map.on('baselayerchange', handleBaseLayerChange);
    map.on('overlayadd', handleOverlayChange);
    map.on('overlayremove', handleOverlayChange);

    // map.on('baselayerchange', handleBaseLayerChange)

    return () => {
      map.off('baselayerchange', handleBaseLayerChange)
      map.off('overlayadd', handleOverlayChange)
      map.off('overlayremove', handleOverlayChange)
    }
  }, [map, kartografijeSet, onLayersChange])

  return null
}

export const Karta = () => {
  const { photoId } = useParams()
  const dispatch = useAppDispatch()
  const windowWidth = useWindowWidth()
  const photos = useSelector((state: RootState) => state.gallery.photos)
  const [kartografije, kartografijeSet] = useState<string>(
    'https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png'
  )

  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set()) // 
  const [selectedLayer, selectedLayerSet] = useState<string | null>(null)
  const [currentPhoto, currentPhotoSet] = useState<Photo | null>(null)
  const viewport = useViewportSize()


  //Wms Debug
// Add this component inside your MapContainer
const WMSDebug = () => {
  const map = useMap()
  
  useEffect(() => {
    console.log('=== WMS DEBUG ===')
    
    // Test WMS URL directly
    const testWMS = async () => {
      const testUrl = 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=tema_koristenje_zemljista_novo&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX=1810000,5680000,1820000,5690000'
      
      console.log('Testing WMS URL:', testUrl)
      
      try {
        const response = await fetch(testUrl)
        console.log('WMS Response status:', response.status, response.statusText)
        
        if (response.ok) {
          console.log('✅ WMS layer is accessible')
        } else {
          console.log('❌ WMS layer failed:', await response.text())
        }
      } catch (error) {
        console.log('❌ WMS fetch error:', error)
      }
    }
    
    testWMS()
    
    // Check what Leaflet is actually requesting
    const checkTiles = () => {
      const tiles = document.querySelectorAll('img[src*="qgis"]')
      console.log(`Found ${tiles.length} WMS tiles`)
      
      tiles.forEach((tile, i) => {
        const src = (tile as HTMLImageElement).src
        console.log(`Tile ${i}:`, src)
        
        // Check if the tile loaded
        tile.addEventListener('load', () => {
          console.log(`Tile ${i} loaded successfully`)
        })
        
        tile.addEventListener('error', () => {
          console.log(`Tile ${i} failed to load`)
        })
      })
    }
    
    setTimeout(checkTiles, 1000)
    
  }, [map])
  
  return null
}
//////////////////////////

  // Handle layer changes
  const handleLayersChange = (layers: Set<string>) => {
    setActiveLayers(layers);
  };

  useEffect(() => {
    if (photoId && selectedLayer !== layers.temafk.id) {
      selectedLayerSet(layers.temafk.id)

      if (photos.length === 0) {
        dispatch(getPhotos())
      }
    }

    if (photoId && photos.length > 0) {
      const photo = photos.find((photo: any) => photo.id === Number(photoId))

      if (photo) {
        currentPhotoSet({
          ...photo,
          foto_url: photo.foto_url ?? `${import.meta.env.VITE_SERVER_PUB}/${photo.signatura}`
        })
      }
    }
  }, [photoId, dispatch, photos, selectedLayer])

  const { BaseLayer, Overlay } = LayersControl

 
// 
  return (
    <div>
      <BlockWithStickyTitle title='Mape'>
        <p>
          Dobrodošli na interaktivnu kartu "Opservatorija krajobraza". Ova karta predstavlja našu
          kontinuirano nadopunjujuću kolekciju georeferenciranih podataka koja vam omogućuje uvid u
          različite aspekte krajobraza. Upotrijebite alate za odabir podloge, prilagodbu slojeva i
          filtriranje informacija kako biste prilagodili prikaz prema vlastitim istraživačkim
          potrebama.
        </p>
      </BlockWithStickyTitle>
<div className='map'>
      <section  id='map-container'>
        <MapContainer
          center={[45.2, 16.2]}
          zoom={10}
          maxZoom={28}
          style={{
            width: '100%',
            height: '90vh',
            cursor: 'crosshair'
          }}
          zoomControl={false}
        >
          {currentPhoto?.signatura && (
            <div className='leaflet-bottom leaflet-right photo-popup'>
              <ul>
                <li>{currentPhoto?.signatura}</li>
                <li>{currentPhoto?.naziv}</li>
                <li>{currentPhoto?.opis}</li>
                <li>{currentPhoto?.lokacija}</li>
                <li>{currentPhoto?.datum_sni}</li>
                <li>{currentPhoto?.kategorija}</li>
                <li>{currentPhoto?.autor}</li>
                <li>{currentPhoto?.tagovi}</li>
              </ul>
              {currentPhoto?.foto_url && (
                <ImageWithSuspense src={currentPhoto?.foto_url} alt={currentPhoto?.naziv} />
              )}
            </div>
          )}

          <LayerHandler kartografijeSet={kartografijeSet} 
          onLayersChange={handleLayersChange} />
          <ZoomControl position='bottomright' />
          <CustomLayersControl collapsed={windowWidth < 1248} activeLayers={activeLayers} >
            <BaseLayer checked name='reljef'>
              <TileLayer url='https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg' />
            </BaseLayer>

            <BaseLayer name='satelitska fotografija (ESRI)'>
              <TileLayer
                attribution='Source: Esri, Maxar, Earthstar Geographics)'
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                maxZoom={20}
                maxNativeZoom={30}
              />
            </BaseLayer>

            <Overlay checked name='Kartografija'>
              <TileLayer url={kartografije} />
            </Overlay>

            {/* fiksni_elementi */}
            <TileLayer
              url='https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png'
              zIndex={999}
            />

            <Overlay key={layers.temakz.id} name={layers.temakz.name}>
              <BetterWMS
                key={layers.temakz.id}
                id={layers.temakz.id}
                url={layers.temakz.url}
                layers={layers.temakz.layers}
                {...layers.temakz.props}
              />
            </Overlay>
            
            <Overlay key={layers.temazp.id} name={layers.temazp.name}>
              <BetterWMS
                key={layers.temazp.id}
                id={layers.temazp.id}
                url={layers.temazp.url}
                layers={layers.temazp.layers}
                {...layers.temazp.props}
              />
            </Overlay>

            <Overlay key={layers.temadz.id} name={layers.temadz.name}>
              <BetterWMS
                key={layers.temadz.id}
                id={layers.temadz.id}
                url={layers.temadz.url}
                layers={layers.temadz.layers}
                {...layers.temadz.props}
              />
            </Overlay>
            {/* <Overlay key={layers.temadgu.id} name={layers.temadgu.name}>
              <BetterWMS
                key={layers.temadgu.id}
                id={layers.temadgu.id}
                url={layers.temadgu.url}
                layers={layers.temadgu.layers}
                {...layers.temadgu.props}
              />
            </Overlay> */}
            <Overlay
              key={layers.temafk.id}
              name={layers.temafk.name}
              checked={selectedLayer === layers.temafk.id}
            >
              <BetterWMS
                key={layers.temafk.id}
                id={layers.temafk.id}
                url={layers.temafk.url}
                layers={layers.temafk.layers}
                onSelectPhoto={currentPhotoSet}
                {...layers.temafk.props}
              />
            </Overlay>
          </CustomLayersControl>
          
          {photoId && <SingleMarker />}
          
          {/* <MapLegends activeLayers={activeLayers}/> */}

          {/* <WMSDebug /> */}
        
        
        </MapContainer>
      </section>
</div>
    </div>
  )
}
// function setActiveLayers(layers: Set<string>) {
//   throw new Error('Function not implemented.')
// }

