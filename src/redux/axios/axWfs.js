import axios from 'axios';

const axWfs = axios.create({
  baseURL:
    'https://landscape.agr.hr/qgis/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=epsg:4326',
  // headers: {
  //   Accept: 'application/json',
  // },
});

export default axWfs;
