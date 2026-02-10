import { useEffect, useState } from 'react'

import { layers } from '../constants'

    const legendUrls: { [key: string]: string } = {
      [layers.temakz.id]:
        'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=tema_koristenje_zemljista_novo&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0',
        
        //JSON
        // 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zasticena_podrucja&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0'

        [layers.temazp.id]:
        'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zasticena_podrucja&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0',
      [layers.temadz.id]:
        'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_drvene_zgrade&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0',
      // [layers.temadgu.id]:
      //   'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_foto_katalog&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0',
      [layers.temafk.id]:
        'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_foto_katalog&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0'
    }



const Legend = ({ layerId }: { layerId: string }) => {
  // ⬇️ Instead of useEffect + state, derive directly:
  const legendUrl = legendUrls[layerId]

  if (!legendUrl) return null

  //
  return (
    <div className='legend-item'>
      <img
        src={legendUrl}
        alt={`Legenda za ${layerId}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

const MapLegends = ({ activeLayers }: { activeLayers: Set<string> }) => {
  if (activeLayers.size === 0) return null

  return (
    <div className='map-legends'>
      {/* <h4>Legende:</h4> */}
      {Array.from(activeLayers).map((layerId) => (
        <Legend key={layerId} layerId={layerId} />
      ))}
    </div>
  )
}

export { MapLegends }