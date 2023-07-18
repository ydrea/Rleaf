import React from 'react';
import { WMSTileLayer } from 'react-leaflet';

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
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

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
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0';

  const wmsLayerOptions = {
    layers: 'administrativna_naselja',
    format: 'image/png',
    transparent: true,
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

// tema_zastita_prirode
export const TemaZP = () => {
  const url =
    'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE';

  const wmsLayerOptions = {
    layers: 'tema_zastita_prirode',
    format: 'image/png',
    transparent: true,
    version: '1.3.0',
    attribution: 'WMS Service Attribution',
  };

  return <>{<WMSTileLayer url={url} {...wmsLayerOptions} />}</>;
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
