// components/CustomLayersControl.tsx
import { LayersControl, useMap } from 'react-leaflet'
import { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import './CustomLayersControl.sass'

interface CustomLayersControlProps {
  children: React.ReactNode
  collapsed?: boolean
  activeLayers: Set<string>
}

interface LegendSymbol {
  icon: string
  title: string
}

interface LegendNode {
  symbols: LegendSymbol[]
  title: string
  type: string
}

interface LegendData {
  nodes: LegendNode[]
  title: string
}

export const CustomLayersControl = ({ 
  children, 
  collapsed = false,
  activeLayers
}: CustomLayersControlProps) => {
  const map = useMap()
  const controlRef = useRef<L.Control.Layers | null>(null)
  const [isExpanded, setIsExpanded] = useState(!collapsed)
  const [legendCache, setLegendCache] = useState<Map<string, LegendData>>(new Map())
  const [isAddingLegends, setIsAddingLegends] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Layer configuration with exact JSON legend URLs
  const layerConfigs = {
    'Korištenje zemljišta': {
      id: 'temakz',
      legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=tema_koristenje_zemljista_novo&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
      wmsLayer: 'tema_koristenje_zemljista_novo'
    },
    'Zaštita prirode': {
      id: 'temazp',
      legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zasticena_podrucja&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
      wmsLayer: 'zasticena_podrucja'
    },
    'Drvene zgrade': {
      id: 'temadz',
      legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_drvene_zgrade&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
      wmsLayer: 'preklop_drvene_zgrade'
    },
    'FOTOTEKA': {
      id: 'temafk',
      legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_foto_katalog&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
      wmsLayer: 'preklop_foto_katalog'
    }
  }

  // PRE-FETCH ALL LEGENDS IMMEDIATELY (in parallel)
  useEffect(() => {
    const prefetchAllLegends = async () => {
      const fetchPromises = Object.entries(layerConfigs).map(async ([layerName, config]) => {
        try {
          const response = await fetch(config.legendUrl)
          if (response.ok) {
            const data: LegendData = await response.json()
            setLegendCache(prev => new Map(prev).set(layerName, data))
          }
        } catch (error) {
          console.error(`Failed to prefetch ${layerName}:`, error)
        }
      })
      
      await Promise.all(fetchPromises)
      console.log('✅ All legends pre-fetched and cached')
    }
    
    prefetchAllLegends()
  }, []) // Run once on mount

  // Render JSON legend (synchronous - uses cache)
  const renderLegend = (legendData: LegendData): string => {
    if (!legendData.nodes || !Array.isArray(legendData.nodes)) {
      return '<div class="no-legend">No legend data available</div>'
    }

    let html = '<div class="legend-items">'
    
    legendData.nodes.forEach((node) => {
      if (node.symbols && Array.isArray(node.symbols)) {
        if (node.title && node.title !== legendData.title) {
          html += `<div class="node-title">${node.title}</div>`
        }
        
        node.symbols.forEach((symbol) => {
          if (symbol.icon && symbol.title) {
            const src = `data:image/png;base64,${symbol.icon}`
            html += `
              <div class="legend-item">
                <div class="legend-symbol">
                  <img src="${src}" alt="${symbol.title}" width="20" height="20">
                </div>
                <div class="legend-label">${symbol.title}</div>
              </div>
            `
          }
        })
      }
    })
    
    html += '</div>'
    return html
  }

  // Add legends to control - uses cache (fast!)
  const addLegendsToControl = useCallback(() => {
    if (isAddingLegends) return
    if (!controlRef.current || !isExpanded) return
    
    const container = controlRef.current.getContainer?.()
    if (!container) return

    setIsAddingLegends(true)

    // Remove existing legends
    const existingLegends = container.querySelectorAll('.custom-layer-legend')
    existingLegends.forEach(legend => legend.remove())

    // Find all checked layers
    const checkedInputs = container.querySelectorAll('input:checked')
    const processedLayers = new Set<string>()
    
    // Use requestAnimationFrame to avoid blocking UI
    requestAnimationFrame(() => {
      for (const input of checkedInputs) {
        const label = input.closest('label')
        if (!label) continue
        
        const labelText = label.textContent?.trim() || ''
        
        for (const [layerName, config] of Object.entries(layerConfigs)) {
          if (labelText.includes(layerName) || layerName.includes(labelText)) {
            if (processedLayers.has(layerName)) continue
            
            processedLayers.add(layerName)
            
            // Get from cache (synchronous!)
            const legendData = legendCache.get(layerName)
            
            const legendContainer = document.createElement('div')
            legendContainer.className = 'custom-layer-legend'
            
            if (legendData) {
              legendContainer.innerHTML = `
                <div class="legend-header">${layerName}</div>
                ${renderLegend(legendData)}
              `
            } else {
              legendContainer.innerHTML = `
                <div class="legend-header">${layerName}</div>
                <div class="no-legend">Loading legend...</div>
              `
            }
            
            label.parentNode?.insertBefore(legendContainer, label.nextSibling)
            break
          }
        }
      }
      
      setIsAddingLegends(false)
    })
  }, [isExpanded, legendCache, isAddingLegends])

  // Debounced version
  const debouncedAddLegends = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(addLegendsToControl, 50) // Reduced from 300ms
  }, [addLegendsToControl])

  // Effects
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (isExpanded) debouncedAddLegends()
  }, [isExpanded, activeLayers, debouncedAddLegends])

  useEffect(() => {
    if (!controlRef.current) return
    const container = controlRef.current.getContainer?.()
    if (!container) return

    const observer = new MutationObserver(() => {
      const expanded = !container.classList.contains('leaflet-control-layers-collapsed')
      setIsExpanded(expanded)
      if (expanded) debouncedAddLegends()
    })

    observer.observe(container, { attributes: true })
    return () => observer.disconnect()
  }, [debouncedAddLegends])

  useEffect(() => {
    if (!controlRef.current) return
    const container = controlRef.current.getContainer?.()
    if (!container) return

    const handleChange = () => debouncedAddLegends()
    container.addEventListener('change', handleChange)
    return () => container.removeEventListener('change', handleChange)
  }, [debouncedAddLegends])

  return (
    <LayersControl ref={controlRef} collapsed={collapsed}>
      {children}
    </LayersControl>
  )
}