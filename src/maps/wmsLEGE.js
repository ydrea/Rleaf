import React, { useState, useEffect } from 'react';
import { WMSTileLayer } from 'react-leaflet';
import axios from 'axios';
// podloge_reljef_hidrologija
export const PodRH = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1401309.737,5146724.677,2219713.38,5899537.848&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'podloge_reljef_hidrologija',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// preklop_administrativne_jedinice
export const PAJedinice = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'preklop_administrativne_jedinice',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// preklop_banijska_naselja

export const PBNaselja = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'preklop_banijska_naselja',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// admin. naselja
export const ANaselja = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'administrativna_naselja',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// fiksni_elementi
export const FiksniElementi = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    zIndex: 6,
    layers: 'fiksni_elementi',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// Teme
// tema_koristenje_zemljista
export const TemaKZ = () => {
  const layerName = 'tema_zastita_prirode';
  const wmsUrl =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1401309.737,5146724.677,2219713.38,5899537.848&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const fetchLegend = async () => {
    const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${layerName}&FORMAT=image/png`;

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

  const [legendUrl, setLegendUrl] = useState(null);

  useEffect(() => {
    fetchLegend();
  }, [layerName]);
  //
  const wmsLayerOptions = {
    layers: layerName,
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return (
    <div>
      <WMSTileLayer url={wmsUrl} {...wmsLayerOptions} />
      {legendUrl && (
        <div
          style={{
            zIndex: '900',
            position: 'relative',
          }}
        >
          {' '}
          <img src={legendUrl} alt="T-KZ_Legend" />
        </div>
      )}
    </div>
  );
};
//
// tema_zastita_prirode
export const TemaZP = () => {
  const layerName = 'tema_zastita_prirode';
  const wmsUrl =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1401309.737,5146724.677,2219713.38,5899537.848&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const fetchLegend = async () => {
    const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${layerName}&FORMAT=image/png`;

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

  const [legendUrl, setLegendUrl] = useState(null);

  useEffect(() => {
    fetchLegend();
  }, [layerName]);
  const wmsLayerOptions = {
    layers: layerName,
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return (
    <div>
      <WMSTileLayer url={wmsUrl} {...wmsLayerOptions} />
      {legendUrl && (
        <div
          style={{
            zIndex: '900',
            position: 'relative',
          }}
        >
          {' '}
          <img src={legendUrl} alt="T-ZP_Legend" />
        </div>
      )}
    </div>
  );
};
//
// tema_stanovnistvo
export const TemaS = () => {
  const layerName = 'tema_stanovnistvo';
  const wmsUrl =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1401309.737,5146724.677,2219713.38,5899537.848&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=false';

  const fetchLegend = async () => {
    const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${layerName}&FORMAT=image/png`;

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

  const [legendUrl, setLegendUrl] = useState(null);

  useEffect(() => {
    fetchLegend();
  }, [layerName]);
  const wmsLayerOptions = {
    layers: layerName,
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return (
    <div>
      <WMSTileLayer url={wmsUrl} {...wmsLayerOptions} />
      {legendUrl && (
        <div
          style={{
            zIndex: '900',
            position: 'relative',
          }}
        >
          {' '}
          <img src={legendUrl} alt="P-BN_Legend" />
        </div>
      )}
    </div>
  );
};
//
// tema_potres
export const TemaP = () => {
  const layerName = 'tema_potres';
  const wmsUrl =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1401309.737,5146724.677,2219713.38,5899537.848&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const fetchLegend = async () => {
    const legendUrl = `https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&LAYER=${layerName}&FORMAT=image/png`;

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

  const [legendUrl, setLegendUrl] = useState(null);

  useEffect(() => {
    fetchLegend();
  }, []);
  const wmsLayerOptions = {
    layers: layerName,
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return (
    <div>
      <WMSTileLayer url={wmsUrl} {...wmsLayerOptions} />
      {legendUrl && (
        <div
          style={{
            zIndex: '900',
            position: 'relative',
          }}
        >
          {' '}
          <img src={legendUrl} alt="T-P_Legend" />
        </div>
      )}
    </div>
  );
};
//

// Teme

// tema_EWAP
export const TemaEWAP = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1810728.437587378547,5687433.67418665532,1815706.106449044077,5692281.923657917418&CRS=EPSG:3857&WIDTH=2000&HEIGHT=1948&LAYERS=tema_drvena_arhitektura&STYLES=&DPI=137&MAP_RESOLUTION=137&FORMAT_OPTIONS=dpi:137&TRANSPARENT=TRUE&FORMAT=image/png;%20mode%3D8bit';

  const wmsLayerOptions = {
    // layers: 'tema_drvena_arhitektura',
    // format: 'image/png',
    // dpi: 137,
    // map_resolution: 137,
    // format_options: 137,
    // transparent: true,
    // version: '1.3.0',
    // attribution: 'WMS Service Attribution',
  };
  // 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE&tema_drvena_arhitektura&image/png';

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};
