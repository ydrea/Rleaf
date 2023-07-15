import axios from 'axios';
import { useEffect, useState } from 'react';
import { GeoJSON, WMSTileLayer } from 'react-leaflet';

export const PreklopAJ = () => {
  const [data, setData] = useState(null);
  //prettier-ignore
  useEffect(()=>{axios.get(   
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&LAYER=administrativna_naselja&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0' 
    // "https://starigrad.agr.unizg.hr/qgis/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1501474.496000000043,5696425.048000000417,1508385.80700000003,5701233.758999999613&CRS=EPSG:3857&WIDTH=382&HEIGHT=266&
    )
    .then(response => {
      setData(response.data); 
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching WFS data:', error);
    });
  },[])

  return <>{data && <WMSTileLayer data={data} />}</>;
};
