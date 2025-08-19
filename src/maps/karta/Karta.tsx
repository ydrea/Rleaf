import { MapContainer, TileLayer, LayersControl, ZoomControl } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'leaflet/dist/leaflet.css'
import 'react-tabs/style/react-tabs.css'

import { layers } from './constants'
import type { Photo } from '../../types/types'
import { BetterWMS } from './components/BetterWMS/BetterWMS'
import { getPhotos } from '../../redux/rtk/gallerySlice'
import { SingleMarker } from './components/SingleMarker/SingleMarker'
import { useAppDispatch } from '../../redux/hooks'
import { useWindowWidth } from '../../services/use-window-width/use-window-width'
import type { RootState } from '../../redux/store'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import { FiksniElementi, PodRV, PodRvi, PodRd, PodK } from '../wms'
import './Karta.sass'

export const Karta = () => {
  const { photoId } = useParams()
  const dispatch = useAppDispatch()
  const windowWidth = useWindowWidth()
  const photos = useSelector((state: RootState) => state.gallery.photos)
  const [selectedLayer, selectedLayerSet] = useState<string | null>(null)
  const [currentPhoto, currentPhotoSet] = useState<Photo | null>(null)

  useEffect(() => {
    if (photoId) {
      selectedLayerSet(layers.temafk.id)

      if (photos.length === 0) {
        dispatch(getPhotos())
      }
    }
  }, [photoId, dispatch, photos])

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

      <section className='map' id='map-container'>
        <MapContainer
          center={[45.2, 16.2]}
          zoom={11}
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
                <img src={currentPhoto?.foto_url} alt={currentPhoto?.naziv} />
              )}
            </div>
          )}

          <ZoomControl position='bottomleft' />

          <LayersControl collapsed={windowWidth < 1248} position='topleft'>
            <BaseLayer checked name='topografija'>
              <PodK />
            </BaseLayer>
            <BaseLayer name='reljef'>
              <PodRV />
            </BaseLayer>
            <BaseLayer name='reljef (visine)'>
              <PodRvi />
            </BaseLayer>
            <BaseLayer name='reljef (tamni)'>
              <PodRd />
            </BaseLayer>
            <BaseLayer name='OSM'>
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                maxZoom={20}
                maxNativeZoom={30}
              />
            </BaseLayer>
            <FiksniElementi />
          </LayersControl>

          <LayersControl collapsed={windowWidth < 1248} position='topright'>
            <Overlay key={layers.gradovirh.id} name={layers.gradovirh.name}>
              <BetterWMS
                key={layers.gradovirh.id}
                id={layers.gradovirh.id}
                url={layers.gradovirh.url}
                layers={layers.gradovirh.layers}
                {...layers.gradovirh.props}
              />
            </Overlay>
            <Overlay key={layers.adminna.id} name={layers.adminna.name}>
              <BetterWMS
                key={layers.adminna.id}
                id={layers.adminna.id}
                url={layers.adminna.url}
                layers={layers.adminna.layers}
                {...layers.adminna.props}
              />
            </Overlay>
            <Overlay key={layers.vode.id} name={layers.vode.name}>
              <BetterWMS
                key={layers.vode.id}
                id={layers.vode.id}
                url={layers.vode.url}
                layers={layers.vode.layers}
                {...layers.vode.props}
              />
            </Overlay>
            <Overlay key={layers.selaiz.id} name={layers.selaiz.name}>
              <BetterWMS
                key={layers.selaiz.id}
                id={layers.selaiz.id}
                url={layers.selaiz.url}
                layers={layers.selaiz.layers}
                {...layers.selaiz.props}
              />
            </Overlay>
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
            <Overlay key={layers.temap.id} name={layers.temap.name}>
              <BetterWMS
                key={layers.temap.id}
                id={layers.temap.id}
                url={layers.temap.url}
                layers={layers.temap.layers}
                {...layers.temap.props}
              />
            </Overlay>
            <Overlay key={layers.temast.id} name={layers.temast.name}>
              <BetterWMS
                key={layers.temast.id}
                id={layers.temast.id}
                url={layers.temast.url}
                layers={layers.temast.layers}
                {...layers.temast.props}
              />
            </Overlay>
            <Overlay key={layers.temastr.id} name={layers.temastr.name}>
              <BetterWMS
                key={layers.temastr.id}
                id={layers.temastr.id}
                url={layers.temastr.url}
                layers={layers.temastr.layers}
                {...layers.temastr.props}
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
            <Overlay key={layers.temadgu.id} name={layers.temadgu.name}>
              <BetterWMS
                key={layers.temadgu.id}
                id={layers.temadgu.id}
                url={layers.temadgu.url}
                layers={layers.temadgu.layers}
                {...layers.temadgu.props}
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
                onSelectPhoto={currentPhotoSet}
                {...layers.temafk.props}
              />
            </Overlay>
          </LayersControl>
          {photoId && <SingleMarker />}
        </MapContainer>
      </section>
    </div>
  )
}
