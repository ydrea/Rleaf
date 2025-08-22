import { MapContainer, TileLayer, LayersControl, ZoomControl, Pane } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useViewportSize } from '@mantine/hooks'
import 'leaflet/dist/leaflet.css'
import 'react-tabs/style/react-tabs.css'

import { layers } from './constants'
import { BetterWMS } from './components/BetterWMS/BetterWMS'
import { SingleMarker } from './components/SingleMarker/SingleMarker'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import { FiksniElementi, PodRV, PodRvi, PodRd, PodK } from '../wms'
import './Karta.sass'

export const Karta = () => {
  const { signatura } = useParams()
  const [kartografije, kartografijeSet] = useState<string>('https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png')
  const [selectedLayer, selectedLayerSet] = useState<string | null>(null)
  const viewport = useViewportSize()

const handleBaseLayerChange = (e: any) => {}

  useEffect(() => {
    if (signatura) {
      selectedLayerSet(layers.temafk.id)
    }
  }, [signatura])

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

      <section className='map' id='mapcnt'>
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

          <LayerHandler kartografijeSet={kartografijeSet} />
          <ZoomControl position='bottomright' />
          <LayersControl collapsed={viewport.width < 1248}
          //  baselayerchange={handleBaseLayerChange  }
          >

            <BaseLayer checked name='reljef'>
           <TileLayer url='https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg'
           />
            </BaseLayer>

            <BaseLayer name='ESRI'>
              <TileLayer 
              attribution='Source: Esri, Maxar, Earthstar Geographics)'
              url=
             'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' 
            //  minZoom={8}
             maxZoom={20}
                maxNativeZoom={30}/>
            </BaseLayer>

           <Overlay checked name='Kartografija'>
              <TileLayer url={kartografije} />
            </Overlay>


         {/* <BaseLayer name='OSM'>
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                maxZoom={20}
                maxNativeZoom={30}
              />
            </BaseLayer> */}
{/* fiksni_elementi */}
<TileLayer url='https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png' zIndex={999} />

            {/* <Overlay key={layers.gradovirh.id} name={layers.gradovirh.name}>
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
            </Overlay> */}
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
            {/* <Overlay key={layers.temap.id} name={layers.temap.name}>
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
            </Overlay> */}
            {/* <Overlay key={layers.temastr.id} name={layers.temastr.name}>
              <BetterWMS
                key={layers.temastr.id}
                id={layers.temastr.id}
                url={layers.temastr.url}
                layers={layers.temastr.layers}
                {...layers.temastr.props}
              />
            </Overlay> */}
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
                {...layers.temafk.props}
              />
            </Overlay>
          </LayersControl>
          {signatura && <SingleMarker />}
        </MapContainer>
      </section>
    </div>
  )
}


// New component to handle layer changes
const LayerHandler = ({ kartografijeSet }: { kartografijeSet: (url: string) => void }) => {
  const map = useMap()

  useEffect(() => {
    const handleBaseLayerChange = (e: any) => {
      if (e.name === 'reljef') {
        kartografijeSet('https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png')
      } else {
        kartografijeSet('https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png')
      }
    }

    map.on('baselayerchange', handleBaseLayerChange)

    return () => {
      map.off('baselayerchange', handleBaseLayerChange)
    }
  }, [map, kartografijeSet])

  return null
}

import { useMap as useLeafletMap } from 'react-leaflet'

function useMap() {
  return useLeafletMap();
}
