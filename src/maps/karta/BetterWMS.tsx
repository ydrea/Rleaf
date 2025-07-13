import { type GridLayerOptions } from 'leaflet'
import { createTileLayerComponent, createElementObject, updateGridLayer } from '@react-leaflet/core'

import { BetterTileLayerWMS } from './L.TileLayer.BetterWMS'

interface BetterWMSProps extends GridLayerOptions {
  url: string
  layers: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  id: string
}

const BetterWMS = createTileLayerComponent(
  ({ url, layers, ...props }: BetterWMSProps, context) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layer = new (BetterTileLayerWMS as any)(url, { layers, ...props })

    return createElementObject(layer, context)
  },
  (layer, props: BetterWMSProps, prevProps: BetterWMSProps) => {
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(layer as any).setParams(props.params)
    }
  }
)

export default BetterWMS
