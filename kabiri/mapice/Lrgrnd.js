const legendUrl =
  'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=banija_zgrade&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0';

// Fetch the legend image
const fetchLegend = async () => {
  try {
    const response = await axios.get(legendUrl, {
      responseType: 'blob',
    });
    // Assuming your WMS server returns the legend as PNG
    const legendImage = URL.createObjectURL(response.data);
    return legendImage;
  } catch (error) {
    console.error('Error fetching legend:', error);
    return null;
  }
};

const MapWithLegend = () => {
  const [legendImage, setLegendImage] = useState(null);

  useEffect(() => {
    // Fetch the legend image when the component mounts
    fetchLegend().then(legend => {
      if (legend) {
        setLegendImage(legend);
      }
    });
  }, []);

  return (
    <div>
      <div className="map-container">{/* Your Leaflet map */}</div>
      <div className="legend-container">
        {legendImage && <img src={legendImage} alt="Legend" />}
      </div>
    </div>
  );
};

// export default MapWithLegend;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Legend({ selectedLayer }) {
//   const [legendUrl, setLegendUrl] = useState(
//     `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${selectedLayer}&FORMAT=image/png`
//   );

//   const fetchLegend = async () => {
//     try {
//       const response = await axios.get(legendUrl, {
//         responseType: 'blob',
//       });
//       const legendImageUrl = URL.createObjectURL(response.data);
//       setLegendUrl(legendImageUrl);
//     } catch (error) {
//       console.error('Error fetching legend:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLegend();
//   }, [selectedLayer]); // Trigger the fetch when selectedLayer changes

//   return (
//     <div>
//       <img
//         src={legendUrl}
//         className="legend"
//         alt={`${selectedLayer} Legend`}
//       />
//     </div>
//   );
// }
