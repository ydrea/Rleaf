import React, { useEffect, useState } from 'react';
import { WMSTileLayer } from 'react-leaflet';

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

// https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=podloge_reljef_hidrologija
export const PodRH = () => {
  const [legendUrl, setLegendUrl] = useState(
    'https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=podloge_reljef_hidrologija&TRANSPARENT=true'
  );
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1401309.737,5146724.677,2219713.38,5899537.848&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'podloge_reljef_hidrologija',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };
  useEffect(() => {
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

    fetchLegend(); // Trigger the fetchLegend function when the component mounts.
  }, []);

  return (
    <>
      {' '}
      {<WMSTileLayer url={url} {...wmsLayerOptions} />}
      <div
        style={{
          background: 'transparent',
          maxWidth: 'auto',
          maxHeight: '60vh',
          position: 'absolute',
          top: '0vh',
          left: '1vw',
          // paddingRight: '5vw',
          zIndex: '1000',
        }}
      >
        {/* <img
          src={legendUrl}
          alt="Legend for podloge_reljef_hidrologija"
        /> */}
      </div>
    </>
  );
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
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'tema_koristenje_zemljista',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=tema_zastita_prirode
export const TemaZP = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'tema_zastita_prirode',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };
  const legend =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=tema_zastita_prirode&TRANSPARENT=true';

  return (
    <>
      {<WMSTileLayer url={url} {...wmsLayerOptions} />}
      {/* <img
        src={legend}
        style={{
          background: 'transparent',
          maxWidth: 'auto',
          maxHeight: '40vh',
          zIndex: '800',
          position: 'fixed',
          bottom: '0vh',
          right: '4vw',
        }}
        alt="Legend for tema_zastita_prirode"
      /> */}
    </>
  );
};
// tema_stanovnistvo
export const TemaS = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'tema_stanovnistvo',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };
  const legend =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=tema_stanovnistvo&TRANSPARENT=true';

  return (
    <>
      {<WMSTileLayer url={url} {...wmsLayerOptions} />}
      {/* <img
        src={legend}
        style={{
          background: '#8c8d85',
          maxHeight: '40vh',
          maxWidth: 'auto',
          zIndex: '800',
          position: 'fixed',
          top: '20vh',
          right: '9vw',
        }}
        alt="Legend for tema_stanovnistvo"
      /> */}
    </>
  );
};

// tema_potres
export const TemaP = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'tema_potres',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};
