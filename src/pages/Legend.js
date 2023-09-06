// export default Legend;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Legend({ selectedLayer }) {
  const [legendUrl, setLegendUrl] = useState(
    `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png&TRANSPARENT=true`
  );
  useEffect(() => {
    setLegendUrl(null);
  }, [selectedLayer]);

  useEffect(() => {
    if (selectedLayer) {
      const fetchLegend = async () => {
        const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png`;

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
    }
  }, [selectedLayer]);

  return (
    <div style={{ position: 'fixed', top: '20vh', right: '0' }}>
      {legendUrl ? (
        <img
          src={legendUrl}
          style={{
            background: 'transparent',
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
