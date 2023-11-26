// Legend.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Legend({ selectedLayer }) {
  const [legendUrl, setLegendUrl] = useState(null);

  useEffect(() => {
    if (selectedLayer) {
      const fetchLegend = async () => {
        const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png`;

        console.log('Fetching legend for layer:', selectedLayer);

        try {
          const response = await axios.get(legendUrl, {
            responseType: 'blob',
          });
          const legendImageUrl = URL.createObjectURL(response.data);
          setLegendUrl(legendImageUrl);
        } catch (error) {
          console.error('Error fetching legend:', error);
        }
      };

      fetchLegend();
    } else {
      // Clear legendUrl if selectedLayer is falsy
      setLegendUrl(null);
    }
  }, [selectedLayer]);

  return (
    <div>
      {legendUrl ? (
        <img
          src={legendUrl}
          style={{
            zIndex: '9999',
            position: 'fixed',
            top: '0',
            right: '0',
          }}
          alt={`${selectedLayer} Legend`}
        />
      ) : (
        <p>Loading legend...</p>
      )}
    </div>
  );
}

export default Legend;
