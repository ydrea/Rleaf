// LegendForLayer1.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function LegendForLayer1() {
  const selectedLayer = 'podloge_reljef_hidrologija'; // Replace with the actual layer name
  const [legendUrl, setLegendUrl] = useState(
    `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png`
  );

  const fetchLegend = async () => {
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

  useEffect(() => {
    fetchLegend();
  }, [selectedLayer]);

  return (
    <div>
      <img src={legendUrl} alt={`${selectedLayer} Legend`} />
    </div>
  );
}

// LegendForLayer2
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//
export default function LegendForLayer2() {
  const selectedLayer = 'tema_zastita_prirode'; // Replace with the actual layer name
  const [legendUrl, setLegendUrl] = useState(
    `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png`
  );

  const fetchLegend = async () => {
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

  useEffect(() => {
    fetchLegend();
  }, [selectedLayer]);

  return (
    <div>
      <img src={legendUrl} alt={`${selectedLayer} Legend`} />
    </div>
  );
}

// LegendForLayer3

import React, { useEffect, useState } from 'react';
import axios from 'axios';
//
export default function LegendForLayer2() {
  const selectedLayer = 'tema_stanovnistvo'; // Replace with the actual layer name
  const [legendUrl, setLegendUrl] = useState(
    `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png`
  );

  const fetchLegend = async () => {
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

  useEffect(() => {
    fetchLegend();
  }, [selectedLayer]);

  return (
    <div>
      <img src={legendUrl} alt={`${selectedLayer} Legend`} />
    </div>
  );
}
//
