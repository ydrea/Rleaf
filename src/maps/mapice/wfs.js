import axios from 'axios';
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { Icon } from 'leaflet';
import { useMapEvents } from 'react-leaflet/hooks';
//
const baseURL =
  'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326&';
//
const myIcon = new Icon({
  iconUrl: require('../assets/ikona.png'),
  iconSize: [28, 28],
});
//

export const Stanovnistvo = () => {
  const [dataSt, setData] = useState(null);
  //prettier-ignore
  useEffect(()=>{axios.get(   
      baseURL+'TYPENAME=naselja_stanovnistvo' )
      .then(response => {
        setData(response.data); 
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching WFS data:', error);
      });
    },[])

  return <>{dataSt && <GeoJSON dataSt={data} icon={myIcon} />}</>;
};
