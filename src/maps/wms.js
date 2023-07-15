import React from 'react';
import { WMSTileLayer } from 'react-leaflet';

// preklop_administrativne_jedinice
export const PAJedinice = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'preklop_administrativne_jedinice',
    format: 'image/png',
    transparent: false,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// preklop_banijska_naselja

export const PBNaselja = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'preklop_banijska_naselja',
    format: 'image/png',
    transparent: false,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// admin. naselja
export const ANaselja = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'administrativna_naselja',
    format: 'image/png',
    transparent: false,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};

// JLS
export const JLS = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: ' JLS',
    format: 'image/png',
    transparent: false,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
};
