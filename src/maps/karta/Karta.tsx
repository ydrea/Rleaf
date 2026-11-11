import { useMap, Marker, MapContainer, TileLayer, LayersControl, ZoomControl, Popup } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { LayersControlEvent } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-tabs/style/react-tabs.css'

import MarkerClusterGroup from 'react-leaflet-cluster'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

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
import { preloadTiles } from './preLoad'
// import {preloadTiles} from './preLoad'

//
const fototekaIcon = L.divIcon({
  className: 'fototeka-marker',
  html: `
    <div style="
      width: 32px; height: 32px;
      background: white;
      border: 3px solid #fff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">
      <img src="/icons/fototeka.svg" style="width: 20px; height: 20px;" alt="Fototeka" />
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

const LayerHandler = ({
  kartografijeSet,
  onLayersChange
}: {
  kartografijeSet: (url: string) => void
  onLayersChange: (activeLayers: Set<string>) => void
}) => {
  const map = useMap()
  useEffect(() => {
    const activeLayers = new Set<string>()

    const handleBaseLayerChange = (e: LayersControlEvent) => {
      if (e.name === 'reljef') {
        kartografijeSet('https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png')
      } else {
        kartografijeSet('https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png')
      }
    }

    const handleOverlayChange = (e: any) => {
      const layerName = e.name
      const layerConfig = Object.values(layers).find(l => l.name === layerName)
      const layerId = layerConfig?.id

      if (!layerId) return

      if (e.type === 'overlayadd') {
        activeLayers.add(layerId)
      } else if (e.type === 'overlayremove') {
        activeLayers.delete(layerId)
      }
      onLayersChange(new Set(activeLayers))
    }

    map.on('baselayerchange', handleBaseLayerChange)
    map.on('overlayadd', handleOverlayChange)
    map.on('overlayremove', handleOverlayChange)
    return () => {
      map.off('baselayerchange', handleBaseLayerChange)
      map.off('overlayadd', handleOverlayChange)
      map.off('overlayremove', handleOverlayChange)
    }
  }, [map, kartografijeSet, onLayersChange])
  return null
}

const GestureHandling = () => {
  const map = useMap()
  
  useEffect(() => {
    const el = map.getContainer()
    
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && el.contains(e.target as Node)) map.dragging.enable()
    }
    const onMouseUp = () => map.dragging.disable()

    map.dragging.disable()
    map.scrollWheelZoom.enable()

    window.addEventListener('pointerdown', onPointerDown, true)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true)
      window.removeEventListener('mouseup', onMouseUp)
      map.dragging.enable()
    }
  }, [map])
  
  return null
}

const MapZoomer = ({ position, isShowOnMap, photoId }: { position: L.LatLng | null, isShowOnMap: boolean, photoId?: string }) => {
  const map = useMap()
  const hasZoomed = useRef(false)

  useEffect(() => {
    hasZoomed.current = false
  }, [photoId])

  useEffect(() => {
    console.log('position',position);
    
    if (position) {
      const offsetPosition = L.latLng(position.lat - 0.005, position.lng)
      console.log('offsetPosition',offsetPosition);
      
      if (isShowOnMap && !hasZoomed.current) {
        hasZoomed.current = true
        map.flyTo(offsetPosition, 15, { animate: true, duration: 0.5 })
      } else if (!isShowOnMap) {
        map.panTo(offsetPosition, { animate: true, duration: 0.5 })
      }
    }
  }, [position, isShowOnMap, photoId, map])

  return null
}

export const Karta = () => {
  const { photoId } = useParams()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const windowWidth = useWindowWidth()
  const photos = useSelector((state: RootState) => state.gallery.photos)

  const [kartografije, kartografijeSet] = useState<string>(
    'https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png'
  )

  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set())
  const [currentPhoto, currentPhotoSet] = useState<Photo | null>(null)
  const [popupPosition, setPopupPosition] = useState<L.LatLng | null>(null)
  const [imageError, setImageError] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [fototekaMarkers, setFototekaMarkers] = useState<(Photo & { latlng: L.LatLng })[]>([])
const [isLoading, setIsLoading] = useState(false)

  // dolazis li iz Photo.tsx?
  const isShowOnMap = location.state?.showOnMap === true

  // Dohvati markere
  useEffect(() => {
    const fetchAllMarkers = async () => {
      try {
        const response = await fetch(`https://server.croatianlandscape.hr/json_photos`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()

        const merged = data.map((item: any) => {
          if (!item || !item.geometry) return null

          const photoMatch = photos.find(p => p.signatura === item.signatura)
          const geometry = typeof item.geometry === 'string' ? JSON.parse(item.geometry) : item.geometry
          if (!geometry.coordinates) return null

          const [lng, lat] = geometry.coordinates

          return {
            id: photoMatch?.id || item.signatura,
            signatura: item.signatura,
            foto_url: `${import.meta.env.VITE_SERVER_PUB}/${item.signatura}`,
            latlng: L.latLng(lat, lng)
          }
        }).filter(Boolean)

        setFototekaMarkers(merged as any)
      } catch (error) {
        console.error('❌ Error in fetchAllMarkers:', error)
      }
    }

    fetchAllMarkers()
  }, [photos])

  // Preload tiles
// Add this near your other helpers like LayerHandler or GestureHandling
const TilePreloader = ({ kartografije }: { kartografije: string }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // Dynamically build layers based on current state
    const currentLayers = [
      'https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg',
      kartografije,
      'https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png',
    ]

    const run = () => {
      preloadTiles(map, currentLayers, { buffer: 1 }).catch(console.error)
    }
    
    map.whenReady(run)
    map.on('moveend zoomend', run)

    return () => {
      map.off('moveend zoomend', run)
    }
  }, [map, kartografije]) // Re-runs if base map changes!

  return null
}

  // useEffect(() => {
  //   const preloadVisibleTiles = async () => {
  //     const zoom = 10
  //     const center = { lat: 45.2, lng: 16.2 }
  //     const latRad = (center.lat * Math.PI) / 180
  //     const n = Math.pow(2, zoom)
  //     const x = Math.floor(((center.lng + 180) / 360) * n)
  //     const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n)
  //     const layers = [
  //       'https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg',
  //       kartografije,
  //       'https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png',
  //     ]
  //     const tick = () => new Promise((r) => setTimeout(r, 0))
  //     for (const template of layers) {
  //       for (let dx = -2; dx <= 2; dx++) {
  //         for (let dy = -2; dy <= 2; dy++) {
  //           const url = template.replace('{z}', zoom.toString()).replace('{x}', (x + dx).toString()).replace('{y}', (y + dy).toString())
  //           fetch(url, { mode: 'no-cors' }).catch(() => {})
  //         }
  //       }
  //       await tick()
  //     }
  //   }
  //   preloadVisibleTiles()
  // }, [kartografije])

  // const fetchPhotoCoordinates = async (photoId: number) => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/json_photos`)
  //     const data = await response.json()
  //     const photo = photos.find(p => p.id === photoId)
  //     if (photo) {
  //       const photoGeo = data.find((item: any) => item.signatura === photo.signatura || item.id === photoId)
  //       if (photoGeo && photoGeo.geometry) {
  //         const geometry = typeof photoGeo.geometry === 'string' ? JSON.parse(photoGeo.geometry) : photoGeo.geometry
  //         const coords = geometry.coordinates
  //         return L.latLng(coords[1], coords[0])
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch coordinates:', error)
  //   }
  //   return null
  // }

  // koristi pravi ID
  const handlePhotoSelect = (photo: Photo, latlng?: L.LatLng) => {
    setImageError(false)
    const fotoUrl = photo.foto_url ?? `${import.meta.env.VITE_SERVER_PUB}/${photo.signatura}`
    
    // Ako photo.id nije broj, traži pravi ID u Reduxu
    let finalId = photo.id
    if (typeof finalId !== 'number') {
      const photoMatch = photos.find(p => p.signatura === photo.signatura)
      if (photoMatch) {
        finalId = photoMatch.id
      }
    }
    
    currentPhotoSet({ 
      ...photo, 
      id: finalId as number, 
      foto_url: fotoUrl 
    })
    
    if (latlng) setPopupPosition(latlng)
  }

  const handleLayersChange = (layers: Set<string>) => {
    if (layers instanceof Set) setActiveLayers(layers)
    else setActiveLayers(new Set(layers))
  }

  // showOnMap programmatic logic
useEffect(() => {
  if (photoId) {
    setActiveLayers(prev => {
      const newSet = new Set(prev)
      newSet.add(layers.temafk.id as string)
      return newSet
    })
  }

  if (photoId && photos.length === 0) {
    dispatch(getPhotos())
  }

  if (photoId && photos.length > 0) {
    const photo = photos.find((photo: any) => photo.id === Number(photoId))

    if (photo) {
      const fotoUrl = photo.foto_url ?? `${import.meta.env.VITE_SERVER_PUB}/${photo.signatura}`
      currentPhotoSet({ ...photo, foto_url: fotoUrl })

      // 🔥 Koristi geojson koji već dolazi u photo objektu
      if (photo.geojson) {
        try {
          const geometry = typeof photo.geojson === 'string' ? JSON.parse(photo.geojson) : photo.geojson
          if (geometry && geometry.coordinates) {
            const [lng, lat] = geometry.coordinates
            setPopupPosition(L.latLng(lat, lng))
          } else {
            console.log('❌ Nema koordinata u geojson za:', photo.signatura)
          }
        } catch (e) {
          console.error('❌ Greška pri parsiranju geojson:', e)
        }
      } else {
        console.log('❌ Nema geojson polja za:', photo.signatura)
      }
    }
  }
}, [photoId, dispatch, photos])

  const { BaseLayer, Overlay } = LayersControl

  return (
    <div>
      <div className='map'>
        <section id='map-container' style={{ position: 'relative' }}>
  {isLoading && (
    <div className="map-spinner">
      <div className="spinner"></div>
      <p>Učitavam kartu...</p>
    </div>
  )}

  <MapContainer 
    center={[45.2, 16.2]}
    zoom={10}
    minZoom={8}
    maxZoom={28}
    style={{ width: '100%', height: '85vh', cursor: 'crosshair', marginTop: -80 }}
    zoomControl={false}
    ref={(map) => {
      if (map) {
        // Kad je mapa spremna, makni spinner
        map.whenReady(() => setIsLoading(false))
      }
    }}
  >
        {/* <section id='map-container'>
          <MapContainer
            center={[45.2, 16.2]}
            zoom={10}
            minZoom={8}
            maxZoom={28}
            style={{ width: '100%', height: '85vh', cursor: 'crosshair', marginTop: -80 }}
            zoomControl={false}
          > */}
 
  <TilePreloader kartografije={kartografije} />
            <GestureHandling />
            <LayerHandler kartografijeSet={kartografijeSet} onLayersChange={handleLayersChange} />
            <ZoomControl position='bottomright' />

        <MapZoomer position={popupPosition} isShowOnMap={isShowOnMap} photoId={photoId} />

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
                checked={activeLayers.has(layers.temafk.id)}
              >
                <MarkerClusterGroup
                  key={activeLayers.has(layers.temafk.id) ? 'active' : 'inactive'}
                  chunkedLoading
                  maxClusterRadius={40}
                >
                  {fototekaMarkers.map((marker, index) => (
                    <Marker
                      key={`${marker.id}-${index}`}
                      position={[marker.latlng.lat, marker.latlng.lng]}
                      icon={fototekaIcon}
                      eventHandlers={{
                        click: () => handlePhotoSelect(marker, marker.latlng)
                      }}
                    />
                  ))}
                </MarkerClusterGroup>
              </Overlay>
            </CustomLayersControl>

            {photoId && <SingleMarker />}

            {popupPosition && currentPhoto && (
              <Popup
                className='photo-popup'
                autoPan={true}
                autoPanPaddingTopLeft={[50, 50]}
                autoPanPaddingBottomRight={[50, 50]}
                position={popupPosition}
                eventHandlers={{
                  remove: () => {
                    setPopupPosition(null)
                    currentPhotoSet(null)
                    setImageError(false)
                  }
                }}
              >
                <ul>
                  <li>
                    <span className='label'>Signatura</span>{' '}
                    <span className='value'>{currentPhoto.signatura.slice(0,11)}</span>
                  </li>
                </ul>
                {currentPhoto.foto_url && !imageError && (
                  <Link to={`/photos/${currentPhoto.id}`}>
                    <div style={{ textAlign: 'center', maxWidth: '250px', minHeight: '100px', backgroundColor: '#f5f5f5', borderRadius: '4px', padding: '5px', marginTop: '10px', cursor: 'pointer' }}>
                      <ImageWithSuspense
                        src={currentPhoto.foto_url}
                        alt={currentPhoto.naziv || 'Photo'}
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', display: 'block', margin: '0' }}
                        onError={() => {
                          console.error('❌ Image failed to load:', currentPhoto.foto_url)
                          setImageError(true)
                        }}
                      />
                    </div>
                  </Link>
                )}
                {imageError && (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#666', fontStyle: 'italic', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '10px' }}>
                    🖼️ Image not available
                  </div>
                )}
              </Popup>
            )}
            <button className='about-map-btn' onClick={() => setAboutOpen(true)}>
              o Karti
            </button>
          </MapContainer>
        </section>
      </div>

      {aboutOpen && (
        <div className="about-panel">
          <button
            className="about-panel-close"
            onClick={() => setAboutOpen(false)}
          >
            ×
          </button>
          <h2>Opservatorij krajobraza</h2>
          <p>
            Dobrodošli na interaktivnu kartu "Opservatorija krajobraza". Ova karta predstavlja našu
            kontinuirano nadopunjujuću kolekciju georeferenciranih podataka koja vam omogućuje uvid u
            različite aspekte krajobraza. Upotrijebite alate za odabir podloge, prilagodbu slojeva i
            filtriranje informacija kako biste prilagodili prikaz prema vlastitim istraživačkim
            potrebama.
          </p>
        </div>
      )}
    </div>
  )
}