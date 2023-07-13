import axios from 'axios';

const axWms = axios.create({
  baseURL:
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0',
  //   headers: {
  //     Accept: 'application/json',
  //   },
});

export default axWms;
