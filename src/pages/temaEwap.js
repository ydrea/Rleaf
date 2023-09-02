import { WMSTileLayer } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Legend = () => {
  const [legendUrl, setLegendUrl] = useState('');

  // Function to fetch the legend
  const fetchLegend = async () => {
    const legendRequestUrl =
      'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=banija_zgrade&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0';

    try {
      const response = await axios.get(legendRequestUrl, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'image/png' });
      const dataUrl = URL.createObjectURL(blob);

      setLegendUrl(dataUrl);
    } catch (error) {
      console.error('Error fetching legend:', error);
    }
  };

  useEffect(() => {
    // Fetch the legend when the component mounts
    fetchLegend();
  }, []);

  return <img src={legendUrl} alt="Legend" />;
};

const GetFeatureInfo = ({ map }) => {
  const [featureInfo, setFeatureInfo] = useState('');

  // Function to handle GetFeatureInfo requests
  const getFeatureInfo = async latlng => {
    const wmsUrl = 'https://landscape.agr.hr/qgis?SERVICE=WMS';

    try {
      // Make a GetFeatureInfo request to the WMS server
      const response = await axios.get(wmsUrl, {
        params: {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326', // Coordinate reference system
          format: 'image/png',
          transparent: true,
          version: '1.1.1',
          bbox: map.getBounds().toBBoxString(),
          height: 300,
          width: 300,
          layers: 'banija_zgrade', // Adjust to your WMS layer name
          query_layers: 'banija_zgrade', // Adjust to your WMS layer name
          info_format: 'text/plain',
          feature_count: 1,
          x: 150, // Coordinates in pixels
          y: 150, // Coordinates in pixels
        },
      });

      // Update the featureInfo state with the response data
      setFeatureInfo(response.data);
    } catch (error) {
      console.error('Error fetching GetFeatureInfo:', error);
    }
  };

  useEffect(() => {
    // Handle map click events
    const handleMapClick = e => {
      getFeatureInfo(e.latlng);
    };

    // Attach the click event listener to the map
    map.on('click', handleMapClick);

    // Remove the event listener when the component unmounts
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map]);

  return <div>{/* Display your GetFeatureInfo data here */}</div>;
};

export function Ewap({ map }) {
  return (
    <>
      {/* Use the Legend component to display the legend */}
      <Legend />

      {/* Use the WMSTileLayer component for your map */}
      <WMSTileLayer
        url={wmsLayerUrl}
        layers="banija_zgrade"
        format="image/png"
        transparent={true}
        version="1.3.0"
        attribution="WMS Service Attribution"
      />

      {/* Use the GetFeatureInfo component to handle GetFeatureInfo */}
      <GetFeatureInfo map={map} />
    </>
  );
}

const wmsLayerUrl =
  'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0'; // Your WMS URL
