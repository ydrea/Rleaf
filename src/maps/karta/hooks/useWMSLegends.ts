// hooks/useWmsLegend.ts
import { useState, useEffect } from 'react'

interface WmsLegendParams {
  url: string
  layer: string
  width?: number
  height?: number
  format?: string
}

export const useWmsLegend = ({ 
  url, 
  layer, 
  width = 20, 
  height = 20, 
  format = 'image/png' 
}: WmsLegendParams) => {
  const [legendUrl, setLegendUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url || !layer) {
      setLegendUrl(null)
      return
    }

    const getLegend = async () => {
      try {
        // Build WMS GetLegendGraphic request URL
        const params = new URLSearchParams({
          SERVICE: 'WMS',
          VERSION: '1.1.1',
          REQUEST: 'GetLegendGraphic',
          LAYER: layer,
          FORMAT: format,
          WIDTH: width.toString(),
          HEIGHT: height.toString(),
          TRANSPARENT: 'true',
          LEGEND_OPTIONS: 'fontName:Helvetica;fontSize:10;fontColor:0x000000;dx:0.2;dy:0.2;mx:0.2;my:0.2'
        })

        const legendUrl = `${url}?${params.toString()}`
        
        // Test if the legend exists
        const response = await fetch(legendUrl)
        if (response.ok) {
          setLegendUrl(legendUrl)
          setError(null)
        } else {
          throw new Error('Legend not available')
        }
      } catch (err) {
        console.error(`Failed to fetch legend for layer ${layer}:`, err)
        setError('Legend not available')
        setLegendUrl(null)
      }
    }

    getLegend()
  }, [url, layer, width, height, format])

  return { legendUrl, error }
}