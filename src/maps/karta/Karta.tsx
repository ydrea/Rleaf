// Karta.tsx
import { MapContainer, TileLayer, LayersControl, ZoomControl, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
import type { LayersControlEvent } from 'leaflet'
import L from 'leaflet'
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

    const handleOverlayChange = (e: any) => {
      const layerId = e.layer.options.id;

      if (e.type === 'overlayadd') {
        activeLayers.add(layerId);
      } else if (e.type === 'overlayremove') {
        activeLayers.delete(layerId);
      }
      onLayersChange(new Set(activeLayers));
    };

    map.on('baselayerchange', handleBaseLayerChange);
    map.on('overlayadd', handleOverlayChange);
    map.on('overlayremove', handleOverlayChange);

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

  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set()) 
  const [selectedLayer, selectedLayerSet] = useState<string | null>(null)
  const [currentPhoto, currentPhotoSet] = useState<Photo | null>(null)
  const [popupPosition, setPopupPosition] = useState<L.LatLng | null>(null)
  const [imageError, setImageError] = useState(false)

  // Fetch coordinates for a photo
  const fetchPhotoCoordinates = async (photoId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/json_photos`)
      const data = await response.json()
      // Find the photo with matching signatura
      const photo = photos.find(p => p.id === photoId)
      if (photo) {
        const photoGeo = data.find((item: any) => 
          item.signatura === photo.signatura || item.id === photoId
        )
        if (photoGeo && photoGeo.geometry) {
          const geometry = typeof photoGeo.geometry === 'string' 
            ? JSON.parse(photoGeo.geometry) 
            : photoGeo.geometry
          const coords = geometry.coordinates
          return L.latLng(coords[1], coords[0]) // GeoJSON is [lng, lat]
        }
      }
    } catch (error) {
      console.error('Failed to fetch coordinates:', error)
    }
    return null
  }

  const handlePhotoSelect = (photo: Photo, latlng?: L.LatLng) => {
    console.log('📍 Photo selected at:', latlng)
    console.log('📸 Photo data:', photo)
    
    setImageError(false)
    
    const fotoUrl = photo.foto_url ?? `${import.meta.env.VITE_SERVER_PUB}/${photo.signatura}`
    
    currentPhotoSet({
      ...photo,
      foto_url: fotoUrl
    })
    
    if (latlng) {
      setPopupPosition(latlng)
    }
  }

  // Handle layer changes
  const handleLayersChange = (layers: Set<string>) => {
    if (layers instanceof Set) {
      setActiveLayers(layers);
    } else {
      setActiveLayers(new Set(layers));
    }
  };

  // 🔥 FIXED: Auto-open popup when coming from Photo.tsx
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
        const fotoUrl = photo.foto_url ?? `${import.meta.env.VITE_SERVER_PUB}/${photo.signatura}`

        console.log('📸 Photo data from URL:', photo)
        console.log('🔗 Constructed URL:', fotoUrl)

        currentPhotoSet({
          ...photo,
          foto_url: fotoUrl
        })
        
        
    // 🔥 FIX: Get coordinates from the API since Photo type doesn't have lat/lng
    console.log('🔍 Fetching coordinates for photo:', photoId)
    fetchPhotoCoordinates(Number(photoId)).then(latLng => {
      if (latLng) {
        console.log('📍 Setting popup from fetched coordinates:', latLng)
        setPopupPosition(latLng)
      }
    })
  }
}

  }, [photoId, dispatch, photos, selectedLayer])

  const { BaseLayer, Overlay } = LayersControl

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
        <section id='map-container'>
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
            <LayerHandler kartografijeSet={kartografijeSet} 
              onLayersChange={handleLayersChange} />
            <ZoomControl position='bottomright' />
            <CustomLayersControl collapsed={windowWidth < 1248} activeLayers={activeLayers}>
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
                  onSelectPhoto={handlePhotoSelect}
                  {...layers.temakz.props}
                />
              </Overlay>
              
              <Overlay key={layers.temazp.id} name={layers.temazp.name}>
                <BetterWMS
                  key={layers.temazp.id}
                  id={layers.temazp.id}
                  url={layers.temazp.url}
                  layers={layers.temazp.layers}
                  onSelectPhoto={handlePhotoSelect}
                  {...layers.temazp.props}
                />
              </Overlay>

              <Overlay key={layers.temadz.id} name={layers.temadz.name}>
                <BetterWMS
                  key={layers.temadz.id}
                  id={layers.temadz.id}
                  url={layers.temadz.url}
                  layers={layers.temadz.layers}
                  onSelectPhoto={handlePhotoSelect}
                  {...layers.temadz.props}
                />
              </Overlay>

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
                  onSelectPhoto={handlePhotoSelect}
                  {...layers.temafk.props}
                />
              </Overlay>
            </CustomLayersControl>
            
            {photoId && <SingleMarker />}
            
            {popupPosition && currentPhoto && (
              <Popup 
                className="photo-popup"
                autoPan={true} 
                autoPanPadding={[40, 40]}
                position={popupPosition}
                eventHandlers={{
                  remove: () => {
                    setPopupPosition(null)
                    currentPhotoSet(null)
                    setImageError(false)
                  }
                }}
              >
                {/* <div className="photo-popup-content"> */}
   <ul>
      <li><span className="label">Signatura</span> <span className="value">{currentPhoto.signatura}</span></li>
      <li><span className="label">Datum</span> <span className="value">{currentPhoto.datum_sni || '—'}</span></li>
      <li><span className="label">Kategorija</span> <span className="value">{currentPhoto.kategorija || '—'}</span></li>
      <li><span className="label">Autor</span> <span className="value">{currentPhoto.autor || '—'}</span></li>
      <li><span className="label">Tagovi</span> <span className="value">{currentPhoto.tagovi || '—'}</span></li>
    </ul>                  
                  {currentPhoto.foto_url && !imageError && (
                    <Link to={`/photos/${currentPhoto.id}`}>
                      <div style={{ 
                        textAlign: 'center', 
                        maxWidth: '250px',
                        minHeight: '100px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        padding: '5px',
                        marginTop: '10px',
                        cursor: 'pointer'
                      }}>
                        <ImageWithSuspense 
                          src={currentPhoto.foto_url} 
                          alt={currentPhoto.naziv || 'Photo'}
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '200px', 
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0'
                          }}
                          onError={() => {
                            console.error('❌ Image failed to load:', currentPhoto.foto_url)
                            setImageError(true)
                          }}
                        />
                      </div>
                    </Link>
                  )}
                  
                  {imageError && (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '20px', 
                      color: '#666',
                      fontStyle: 'italic',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      marginTop: '10px'
                    }}>
                      🖼️ Image not available
                    </div>
                  )}
                {/* </div> */}
              </Popup>
            )}
          </MapContainer>
        </section>
      </div>
    </div>
  )
}