// import L, { type TileLayer } from 'leaflet'
// import axios from 'axios'

// import type { Photo } from '../../../../types/types'

// export const BetterTileLayerWMS = L.TileLayer.WMS.extend({
//   onAdd: function (map: L.Map) {
//     // Triggered when the layer is added to a map.
//     // Register a click listener, then do all the upstream WMS things
//     L.TileLayer.WMS.prototype.onAdd.call(this, map)
//     map.on('click', this.getFeatureInfo, this) // Bind the function to the correct context
//   },

//   onRemove: function (map: L.Map) {
//     // Triggered when the layer is removed from a map.
//     //   Unregister a click listener, then do all the upstream WMS things
//     L.TileLayer.WMS.prototype.onRemove.call(this, map)
//     map.off('click', this.getFeatureInfo, this)
//   },

//   getFeatureInfo: function (evt: L.LeafletMouseEvent) {
//     const el = evt.originalEvent.target as HTMLElement | null

//     if (el?.closest('.photo-popup')) {
//       return
//     }

//     const url = this.getFeatureInfoUrl(evt.latlng)
//     const showResults = L.Util.bind(this.showGetFeatureInfo, this)

//     axios
//       .get(url)
//       .then(function (response) {
//         const err = typeof response.data === 'string' ? null : response.data
//         // @ts-expect-error - unknown
//         showResults(err, evt.latlng, response.data)
//       })
//       .catch(function (error) {
//         // @ts-expect-error - unknown
//         showResults(error)
//       })
//   },

//   getFeatureInfoUrl: function (latlng: L.LatLng) {
//     // Convert latlng to integers
//     const point = this._map.latLngToContainerPoint(latlng)
//     const size = this._map.getSize()

//     // Ensure that X and Y coordinates are integers
//     const x = Math.round(point.x)
//     const y = Math.round(point.y)

//     // Other request parameters
//     const params = {
//       request: 'GetFeatureInfo',
//       service: 'WMS',
//       crs: 'EPSG:4326',
//       styles: this.wmsParams.styles,
//       transparent: this.wmsParams.transparent,
//       version: this.wmsParams.version,
//       format: this.wmsParams.format,
//       bbox: this._map.getBounds().toBBoxString(),
//       height: size.y,
//       width: size.x,
//       layers: this.wmsParams.layers,
//       query_layers: this.wmsParams.layers,
//       // info_format: 'text/plain',
//       info_format: 'text/html',
//       // info_format: 'application/json',
//       x: x, // Use the rounded X coordinate
//       y: y // Use the rounded Y coordinate
//     }

//     return this._url + L.Util.getParamString(params, this._url, true)
//   },

//   showGetFeatureInfo: function (err: unknown, latlng: L.LatLng, content: string) {
//     if (err) {
//       console.log(err)
//       return
//     }
//     const data = {} as Record<string, string>
//     const tempDiv = document.createElement('div')
//     tempDiv.innerHTML = content

//     const rows = tempDiv.querySelectorAll('tr')

//     for (const row of rows) {
//       const cells = row.querySelectorAll('th, td')

//       if (cells.length >= 2) {
//         const header = cells?.[0].textContent?.trim()
//         const value = cells?.[1]?.textContent?.trim() ?? ''

//         if (header) {
//           data[header] = value
//         }
//       }
//     }

//     this.options.onSelectPhoto?.(data as unknown as Photo)
//   }
// }) as unknown as typeof TileLayer.WMS
import L, { type TileLayer } from 'leaflet'
import axios from 'axios'

import type { Photo } from '../../../../types/types'

export const BetterTileLayerWMS = L.TileLayer.WMS.extend({
  onAdd: function (map: L.Map) {
    L.TileLayer.WMS.prototype.onAdd.call(this, map)
    map.on('click', this.getFeatureInfo, this)
    
    // Add mousemove event to change cursor
    map.on('mousemove', this.onMouseMove, this)
  },

  onRemove: function (map: L.Map) {
    L.TileLayer.WMS.prototype.onRemove.call(this, map)
    map.off('click', this.getFeatureInfo, this)
    map.off('mousemove', this.onMouseMove, this)
    
    // Reset cursor when layer is removed
    map.getContainer().style.cursor = ''
  },

  onMouseMove: function (evt: L.LeafletMouseEvent) {
    // Check if we're over a photo icon
    const url = this.getFeatureInfoUrl(evt.latlng, { feature_count: 1 })
    
    if (!url) return
    
    // Use a small buffer for hover detection
    const hoverUrl = url + '&BUFFER=5&FEATURE_COUNT=1'
    
    fetch(hoverUrl)
      .then(res => res.json())
      .then(data => {
        const container = this._map.getContainer()
        if (data.features && data.features.length > 0) {
          // Change cursor to pointer when over a photo
          container.style.cursor = 'pointer'
        } else {
          // Reset cursor when not over a photo
          container.style.cursor = ''
        }
      })
      .catch(() => {
        this._map.getContainer().style.cursor = ''
      })
  },

  getFeatureInfo: function (evt: L.LeafletMouseEvent) {
    const el = evt.originalEvent.target as HTMLElement | null

    if (el?.closest('.photo-popup')) {
      return
    }

    const url = this.getFeatureInfoUrl(evt.latlng)
    const showResults = L.Util.bind(this.showGetFeatureInfo, this)

    console.log('🔍 GetFeatureInfo clicked at:', evt.latlng)
    console.log('📡 Request URL:', url)

    axios
      .get(url)
      .then(function (response) {
        console.log('📦 GetFeatureInfo response:', response.data)
        
        const err = typeof response.data === 'string' ? null : response.data
        // @ts-expect-error - unknown
        showResults(err, evt.latlng, response.data)
      })
      .catch(function (error) {
        console.error('❌ GetFeatureInfo error:', error)
        // @ts-expect-error - unknown
        showResults(error)
      })
  },

  getFeatureInfoUrl: function (latlng: L.LatLng, options: any = {}) {
    const point = this._map.latLngToContainerPoint(latlng)
    const size = this._map.getSize()

    const x = Math.round(point.x)
    const y = Math.round(point.y)

    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      crs: 'EPSG:3857',
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: '1.3.0',
      format: this.wmsParams.format,
      bbox: this._map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: 'application/json',
      buffer: options.buffer || 5,
      feature_count: options.feature_count || 5,
      i: x,
      j: y,
      ...options
    }

    return this._url + L.Util.getParamString(params, this._url, true)
  },

  showGetFeatureInfo: function (err: unknown, latlng: L.LatLng, content: string) {
    if (err) {
      console.log('❌ Error in showGetFeatureInfo:', err)
      return
    }
    
    try {
      const data = JSON.parse(content)
      console.log('🖼️ Parsed photo data:', data)
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0]
        const properties = feature.properties
        
        console.log('📸 Photo found:', {
          signatura: properties.signatura,
          naziv: properties.naziv,
          lokacija: properties.lokacija,
          allProps: properties
        })
        
        const photoData = {
          id: properties.id,
          signatura: properties.signatura,
          naziv: properties.naziv,
          opis: properties.opis,
          lokacija: properties.lokacija,
          datum_sni: properties.datum_sni,
          kategorija: properties.kategorija,
          autor: properties.autor,
          tagovi: properties.tagovi,
        }
        
        this.options.onSelectPhoto?.(photoData as Photo)
      } else {
        console.log('ℹ️ No features found at this location')
      }
    } catch (e) {
      console.error('❌ Error parsing GetFeatureInfo response:', e)
    }
  }
}) as unknown as typeof TileLayer.WMS