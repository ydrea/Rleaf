import { useMap } from 'react-leaflet/hooks';
import * as WMS from 'leaflet.wms';

export default function GetFeatureInfoWms(props) {
  const { url, options, layers } = props;
  const map = useMap();

  // Add WMS source/layers
  const source = WMS.source(url, options);

  for (let name of layers) {
    source.getLayer(name).addTo(map);
  }
  return null;
}
