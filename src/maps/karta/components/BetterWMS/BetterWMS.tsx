import type { TileLayer, WMSParams, LatLng } from 'leaflet'
import {
  createTileLayerComponent,
  createElementObject,
  updateGridLayer,
  type LayerProps
} from '@react-leaflet/core'

import type { Photo } from '../../../../types/types'
import { BetterTileLayerWMS } from './L.TileLayer.BetterWMS'

interface BetterWMSProps extends LayerProps {
  id: string
  url: string
  layers: string
  params?: WMSParams
  opacity?: number // 🔥 EXPLICITLY ADD THIS TO SATISFY TS
  onSelectPhoto?: (photo: Photo, latlng?: LatLng) => void
}

export const BetterWMS = createTileLayerComponent<TileLayer.WMS, BetterWMSProps>(
  ({ url, layers, ...props }, context) => {
    const layer = new BetterTileLayerWMS(url, { layers, ...props })
    return createElementObject(layer, context)
  },
  (layer, props, prevProps) => {
    updateGridLayer(layer, props, prevProps)

    // 🔥 Safely cast props to our extended type
    const typedProps = props as BetterWMSProps
    const typedPrevProps = prevProps as BetterWMSProps

    if (typedProps.opacity !== typedPrevProps.opacity) {
      layer.setOpacity(typedProps.opacity ?? 1)
    }

    if (typedProps.params != null && typedProps.params !== typedPrevProps.params) {
      layer.setParams(typedProps.params)
    }
  }
)