export const layers = {
  temastr: {
    id: '771',
    name: 'demografski trend 2011-2021',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'tema_stanovnisto_11_21_trend',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temadgu: {
    id: '772',
    name: 'udio drvene arhitekture',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'tema_drv_gradnja_udio',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  gradovirh: {
    id: '773',
    name: 'gradovi RH',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'preklop_gradoviRH',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  vode: {
    id: '774',
    name: 'vode',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'preklop_vode',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  adminna: {
    id: '775',
    name: 'administrativne jedinice',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'preklop_administrativne_jedinice',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  selaiz: {
    id: '776',
    name: 'naselja i zaseoci Banovine/Banije',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'preklop_banijska_naselja',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temast: {
    id: '777',
    name: 'broj stanovnika 2021',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'tema_stanovnistvo_2021',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temakz: {
    id: '778',
    name: 'poljop. korištenje zemljišta (CORINE)',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'tema_koristenje_zemljista',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temazp: {
    id: '779',
    name: 'zaštićeni dijelovi prirode',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'tema_zastita_prirode',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temap: {
    id: '780',
    name: '  potres 2020: intenzitet (MMI/MCS)',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'tema_potres',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temadz: {
    id: '781',
    name: 'drvene zgrade',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'preklop_drvene_zgrade',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8
    }
  },

  temafk: {
    id: '782',
    name: 'FOTOTEKA',
    url: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetMap&BBOX=1754872.467,5620507.321,1879303.557,5702013.38&WIDTH=382&HEIGHT=266&FORMAT=image/png&CRS=EPSG:3857&STYLE=default&SLD_VERSION=1.1.0&TILED=TRUE',
    layers: 'preklop_foto_katalog',
    props: {
      version: '1.1',
      format: 'image/png',
      transparent: true,
      tiles: true,
      zIndex: 150,
      uppercase: true,
      opacity: 0.8,
      maxZoom: 28
    }
  }
}
