import L from "leaflet";
import "./L.TileLayer.BetterWMS";
import {
    createTileLayerComponent,
    createElementObject,
    updateGridLayer
} from "@react-leaflet/core";

const BetterWMS = createTileLayerComponent(
  function createBetterWMSLayer({options, url, layers, ...props}, context) {
// const handleClick =(e)=>{console.log(e);}
    const layer = new L.TileLayer.betterWms(url, { layers, ...props })
    
    // layer.imageUrl = imageUrl
    console.log(layer);

    return createElementObject(layer, context)
  },
    (layer, props, prevProps) => {
    updateGridLayer(layer, props, prevProps);

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params);
    }
  }
);

export default BetterWMS