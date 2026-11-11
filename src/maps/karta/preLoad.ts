// preLoad.ts
import type { Map as LeafletMap } from 'leaflet'

export async function preloadTiles(
  map: LeafletMap, 
  layers: string[], 
  { buffer = 0 }: { buffer?: number } = {}
) {
  const zoom = map.getZoom()
  const n = Math.pow(2, zoom)
  
  const toTile = ({ lat, lng }: { lat: number; lng: number }) => {
    const r = (lat * Math.PI) / 180
    return {
      x: Math.floor(((lng + 180) / 360) * n),
      y: Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n),
    }
  }
  
  const bounds = map.getBounds()
  const nw = toTile(bounds.getNorthWest())
  const se = toTile(bounds.getSouthEast())

  for (const tpl of layers) {
    for (let x = nw.x - buffer; x <= se.x + buffer; x++) {
      for (let y = nw.y - buffer; y <= se.y + buffer; y++) {
        const url = tpl.replace('{z}', zoom.toString())
                         .replace('{x}', x.toString())
                         .replace('{y}', y.toString())
        fetch(url, { mode: 'no-cors' }).catch(() => {})
      }
    }
    await new Promise(r => setTimeout(r, 0)) // yield per layer
  }
}