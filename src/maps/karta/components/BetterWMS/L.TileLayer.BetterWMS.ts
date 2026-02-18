// L.TileLayer.BetterWMS.ts
import L, { type TileLayer } from 'leaflet'
import axios from 'axios'

import type { Photo } from '../../../../types/types'

export const BetterTileLayerWMS = L.TileLayer.WMS.extend({
  onAdd: function (map: L.Map) {
    L.TileLayer.WMS.prototype.onAdd.call(this, map)
    map.on('click', this.getFeatureInfo, this)
    
    // Add mousemove event to change cursor with debouncing
    this._hoverTimeout = null
    map.on('mousemove', this.onMouseMove, this)
  },

  onRemove: function (map: L.Map) {
    L.TileLayer.WMS.prototype.onRemove.call(this, map)
    map.off('click', this.getFeatureInfo, this)
    map.off('mousemove', this.onMouseMove, this)
    
    // Clear any pending hover timeout
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout)
    }
    
    // Reset cursor when layer is removed
    map.getContainer().style.cursor = ''
  },

  onMouseMove: function (evt: L.LeafletMouseEvent) {
    // Debounce to avoid too many requests
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout)
    }
    
    this._hoverTimeout = setTimeout(() => {
      const url = this.getFeatureInfoUrl(evt.latlng, { feature_count: 1, buffer: 5 })
      
      if (!url) return
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const container = this._map.getContainer()
          if (data.features && data.features.length > 0) {
            container.style.cursor = 'pointer'
          } else {
            container.style.cursor = ''
          }
        })
        .catch(() => {
          this._map.getContainer().style.cursor = ''
        })
    }, 100) // Only check every 100ms
  },


  ////////////////

getFeatureInfo: function (evt: L.LeafletMouseEvent) {
  const el = evt.originalEvent.target as HTMLElement | null

  if (el?.closest('.photo-popup')) {
    return
  }

  const url = this.getFeatureInfoUrl(evt.latlng)
  
  // Store latlng for later use
  const clickLatLng = evt.latlng

  console.log('🔍 GetFeatureInfo clicked at:', clickLatLng)
  console.log('📡 Request URL:', url)

  axios
    .get(url)
    .then((response) => {  // Use arrow function to preserve 'this'
      console.log('📦 GetFeatureInfo response:', response.data)
      
      // Call showGetFeatureInfo directly, not through bind
      this.showGetFeatureInfo(response.data, clickLatLng)
    })
    .catch((error) => {  // Use arrow function to preserve 'this'
      console.error('❌ GetFeatureInfo error:', error)
      this.showGetFeatureInfo(error.message || 'Unknown error', clickLatLng)
    })
},

showGetFeatureInfo: function (content: any, clickLatLng: L.LatLng) {
  if (typeof content === 'string') {
    console.log('❌ Error:', content)
    return
  }
  
  try {
    if (content.features && content.features.length > 0) {
      const feature = content.features[0]
      const properties = feature.properties
      
      const photoData = {
        id: properties.id,
        signatura: properties.signatura,
        naziv: properties.naziv || '',
        opis: properties.opis || '',
        lokacija: properties.lokacija || '',
        datum_sni: properties.datum_sni || '',
        kategorija: properties.kategorija || '',
        autor: properties.autor || '',
        tagovi: properties.tagovi || '',
        foto_url: `${import.meta.env.VITE_SERVER_PUB}/${properties.signatura}`
      }
      
      // Pass both the photo data AND the click location
      this.options.onSelectPhoto?.(photoData, clickLatLng)
    }
  } catch (e) {
    console.error('❌ Error:', e)
  }
},
  //////////////////
  getFeatureInfoUrl: function (latlng: L.LatLng, options: any = {}) {
    const point = this._map.latLngToContainerPoint(latlng)
    const size = this._map.getSize()

    const x = Math.round(point.x)
    const y = Math.round(point.y)

    // Get bounds in real-world 3857 coordinates
    const bounds = this._map.getBounds();
    
    // Use Leaflet's built-in CRS transformation
    const southWest = L.CRS.EPSG3857.project(bounds.getSouthWest());
    const northEast = L.CRS.EPSG3857.project(bounds.getNorthEast());

    // Format BBOX properly for WMS 1.3.0: minx,miny,maxx,maxy
    const bbox = [
      southWest.x.toFixed(6), 
      southWest.y.toFixed(6),
      northEast.x.toFixed(6), 
      northEast.y.toFixed(6)
    ].join(',');

    console.log('✅ Correct BBOX:', bbox); // Should be like 1.8e6 numbers

    const params: Record<string, any> = {
      service: 'WMS',
      version: '1.3.0',
      request: 'GetFeatureInfo',
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      styles: this.wmsParams.styles || '',
      format: this.wmsParams.format || 'image/png',
      transparent: this.wmsParams.transparent !== false,
      crs: 'EPSG:3857',
      bbox: bbox,
      width: size.x,
      height: size.y,
      i: x,
      j: y,
      info_format: 'application/json',
      feature_count: options.feature_count || 5,
      buffer: options.buffer || 5
    }

    // Remove any undefined/null params
    Object.keys(params).forEach(key => 
      params[key] === undefined || params[key] === null ? delete params[key] : null
    );

    const url = this._url + L.Util.getParamString(params, this._url, true);
    console.log('🌍 Final GetFeatureInfo URL:', url);
    
    return url;
  },

//////////////////

// showGetFeatureInfo: function (err: unknown, latlng: L.LatLng, content: any) {
//   if (err) {
//     console.log('❌ Error in showGetFeatureInfo:', err)
//     return
//   }
  
//   try {
//     // content is already an object from axios
//     const data = content
//     console.log('🖼️ Photo data received:', data)
    
//     if (data.features && data.features.length > 0) {
//       const feature = data.features[0]
//       const properties = feature.properties
      
//       console.log('📸 Photo found:', {
//         signatura: properties.signatura,
//         naziv: properties.naziv,
//         lokacija: properties.lokacija
//       })
      
//       const photoData = {
//         id: properties.id,
//         signatura: properties.signatura,
//         naziv: properties.naziv,
//         opis: properties.opis,
//         lokacija: properties.lokacija,
//         datum_sni: properties.datum_sni,
//         kategorija: properties.kategorija,
//         autor: properties.autor,
//         tagovi: properties.tagovi,
//       }
      
//       this.options.onSelectPhoto?.(photoData as Photo)
//     } else {
//       console.log('ℹ️ No features found at this location')
//     }
//   } catch (e) {
//     console.error('❌ Error processing GetFeatureInfo response:', e)
//   }
// }
  /////////////////////////////
}) as unknown as typeof TileLayer.WMS