import { type GridLayerOptions } from 'leaflet';
import { BetterTileLayerWMS } from './L.TileLayer.BetterWMS';
import {
  createTileLayerComponent,
  createElementObject,
  updateGridLayer,
} from '@react-leaflet/core';

interface BetterWMSProps extends GridLayerOptions {
  url: string;
  layers: string;
  params?: any;
  id: string;
}

const BetterWMS = createTileLayerComponent(
  ({ url, layers, ...props }: BetterWMSProps, context) => {
    const layer = new (BetterTileLayerWMS as any)(url, { layers, ...props });

    return createElementObject(layer, context);
  },
  (layer, props: BetterWMSProps, prevProps: BetterWMSProps) => {
    updateGridLayer(layer, props, prevProps);

    if (props.params != null && props.params !== prevProps.params) {
      (layer as any).setParams(props.params);
    }
  }
);

export default BetterWMS;
