import type { TileLayer, WMSParams } from 'leaflet'
import {
  createTileLayerComponent,
  createElementObject,
  updateGridLayer,
  type LayerProps
} from '@react-leaflet/core'

import { BetterTileLayerWMS } from './L.TileLayer.BetterWMS'

interface BetterWMSProps extends LayerProps {
  id: string
  url: string
  layers: string
  params?: WMSParams
}

export const BetterWMS = createTileLayerComponent<TileLayer.WMS, BetterWMSProps>(
  ({ url, layers, ...props }, context) => {
    const layer = new BetterTileLayerWMS(url, { layers, ...props })

    return createElementObject(layer, context)
  },
  (layer, props, prevProps) => {
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params)
    }
  }
)
