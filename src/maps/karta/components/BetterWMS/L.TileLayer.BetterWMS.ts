import L, { type TileLayer } from 'leaflet'
import axios from 'axios'

import type { Photo } from '../../../../types/types'

export const BetterTileLayerWMS = L.TileLayer.WMS.extend({
  onAdd: function (map: L.Map) {
    // Triggered when the layer is added to a map.
    // Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map)
    map.on('click', this.getFeatureInfo, this) // Bind the function to the correct context
  },

  onRemove: function (map: L.Map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map)
    map.off('click', this.getFeatureInfo, this)
  },

  getFeatureInfo: function (evt: L.LeafletMouseEvent) {
    const el = evt.originalEvent.target as HTMLElement | null

    if (el?.closest('.photo-popup')) {
      return
    }

    const url = this.getFeatureInfoUrl(evt.latlng)
    const showResults = L.Util.bind(this.showGetFeatureInfo, this)

    axios
      .get(url)
      .then(function (response) {
        const err = typeof response.data === 'string' ? null : response.data
        // @ts-expect-error - unknown
        showResults(err, evt.latlng, response.data)
      })
      .catch(function (error) {
        // @ts-expect-error - unknown
        showResults(error)
      })
  },

  getFeatureInfoUrl: function (latlng: L.LatLng) {
    // Convert latlng to integers
    const point = this._map.latLngToContainerPoint(latlng)
    const size = this._map.getSize()

    // Ensure that X and Y coordinates are integers
    const x = Math.round(point.x)
    const y = Math.round(point.y)

    // Other request parameters
    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      crs: 'EPSG:4326',
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: this._map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      // info_format: 'text/plain',
      info_format: 'text/html',
      // info_format: 'application/json',
      x: x, // Use the rounded X coordinate
      y: y // Use the rounded Y coordinate
    }

    return this._url + L.Util.getParamString(params, this._url, true)
  },

  showGetFeatureInfo: function (err: unknown, latlng: L.LatLng, content: string) {
    if (err) {
      console.log(err)
      return
    }
    const data = {} as Record<string, string>
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content

    const rows = tempDiv.querySelectorAll('tr')

    for (const row of rows) {
      const cells = row.querySelectorAll('th, td')

      if (cells.length >= 2) {
        const header = cells?.[0].textContent?.trim()
        const value = cells?.[1]?.textContent?.trim() ?? ''

        if (header) {
          data[header] = value
        }
      }
    }

    this.options.onSelectPhoto?.(data as unknown as Photo)
  }
}) as unknown as typeof TileLayer.WMS
