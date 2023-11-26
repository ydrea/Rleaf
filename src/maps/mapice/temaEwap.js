import axios from 'axios';
import React, { useEffect } from 'react';

const MapClickHandler = () => {
  useEffect(() => {
    const mapClickHandler = async e => {
      if (!e.latlng) {
        return; // Ensure latlng is defined
      }

      const { lat, lng } = e.latlng;

      const getFeatureInfoUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&SRS=EPSG:3857&WIDTH=800&HEIGHT=600&LAYERS=tema_drvena_arhitektura&QUERY_LAYERS=tema_drvena_arhitektura&STYLES=&FORMAT=image/png&INFO_FORMAT=application/json&FEATURE_COUNT=50`;

      ('https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE&service=WMS&request=GetMap&layers=tema_drvena_arhitektura&styles=&format=image%2Fpng%20mode%3A%208bit&transparent=true&version=1.3.0&dpi=137&map_resolution=137&format_options=137&width=256&height=256&crs=EPSG%3A3857&bbox=1800244.8901724715,5713820.738373496,1878516.407136492,5792092.255337515');

      //https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&SRS=EPSG:3857&WIDTH=800&HEIGHT=600&LAYERS=tema_drvena_arhitektura&QUERY_LAYERS=tema_drvena_arhitektura&STYLES=&FORMAT=image/png&INFO_FORMAT=application/json&FEATURE_COUNT=50&I=18.20&j=46.2
      // Other query parameters
      // const queryLayers = 'tema_drvena_arhitektura';
      //   const version = '1.3.0';
      const attribution = 'WMS Service Attribution';
      const X = 18.2;
      const Y = 46.2;
      try {
        // Send a GetFeatureInfo request to your WMS service
        const response = await axios.get(getFeatureInfoUrl);
        const featureInfoData = response.data; // Process the feature info data as needed
        console.log('Feature Info Data:', featureInfoData);
      } catch (error) {
        console.error('Error fetching feature info:', error);
      }
    };

    // Attach the click event listener to the map container
    const mapContainer = document.querySelector('.leaflet-container');
    mapContainer.addEventListener('click', mapClickHandler);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      mapContainer.removeEventListener('click', mapClickHandler);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MapClickHandler;
