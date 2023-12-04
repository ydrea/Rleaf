import axios from 'axios';
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Icon } from 'leaflet';
export const Cities = () => {
  const [data, setData] = useState(null);
  //prettier-ignore
  useEffect(()=>{axios.get(   
  'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=fiksno_gradoviRH&outputFormat=application/json&srsName=epsg:4326'  
  )
  .then(response => {
    setData(response.data); 
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching WFS data:', error);
    });
  },[])

  return <>{data && <GeoJSON data={data} />}</>;
};
