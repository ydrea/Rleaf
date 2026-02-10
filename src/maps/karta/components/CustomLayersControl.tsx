// components/CustomLayersControl/CustomLayersControl.tsx
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
  icon: string // base64 image data
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Layer configuration with exact JSON legend URLs
// Update the layerConfigs to use the same names as constants.ts
const layerConfigs = {
  'Korištenje zemljišta': {
    id: 'temakz',
    legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=tema_koristenje_zemljista_novo&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
    wmsLayer: 'tema_koristenje_zemljista_novo' // Add this for reference
  },
  'Zaštita prirode': {
    id: 'temazp',
    legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zasticena_podrucja&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
    wmsLayer: 'zasticena_podrucja'
  },
  'Digitalni zemljopis': {
    id: 'temadz',
    legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_drvene_zgrade&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
    wmsLayer: 'preklop_drvene_zgrade'
  },
  'Fotokarte': {
    id: 'temafk',
    legendUrl: 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_foto_katalog&FORMAT=application/json&STYLE=default&SLD_VERSION=1.1.0',
    wmsLayer: 'preklop_foto_katalog'
  }
}
  // Fetch JSON legend data
  const fetchLegendData = async (layerName: string): Promise<LegendData | null> => {
    const config = layerConfigs[layerName as keyof typeof layerConfigs]
    if (!config) return null

    // Check cache
    if (legendCache.has(layerName)) {
      return legendCache.get(layerName)!
    }

    console.log(`Fetching JSON legend for: ${layerName}`, config.legendUrl)
    
    try {
      const response = await fetch(config.legendUrl)
      if (!response.ok) {
        console.error(`Failed to fetch legend for ${layerName}: ${response.status}`)
        return null
      }
      
      const data: LegendData = await response.json()
      console.log(`Successfully fetched legend for ${layerName}:`, data)
      
      // Cache the result
      setLegendCache(prev => new Map(prev).set(layerName, data))
      return data
    } catch (error) {
      console.error(`Error fetching legend for ${layerName}:`, error)
      return null
    }
  }

  // Render JSON legend
  const renderLegend = (legendData: LegendData): string => {
    if (!legendData.nodes || !Array.isArray(legendData.nodes)) {
      return '<div class="no-legend">No legend data available</div>'
    }

    let html = '<div class="legend-items">'
    
    legendData.nodes.forEach((node) => {
      if (node.symbols && Array.isArray(node.symbols)) {
        // Add layer title if available
        if (node.title && node.title !== legendData.title) {
          html += `<div class="node-title">${node.title}</div>`
        }
        
        // Render each symbol
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

  // Add legends to control - JSON ONLY
  const addLegendsToControl = useCallback(async () => {
    if (isAddingLegends) {
      console.log('Already adding legends, skipping...')
      return
    }
    
    if (!controlRef.current || !isExpanded) {
      console.log('Control not ready or not expanded')
      return
    }
    
    const container = controlRef.current.getContainer()
    if (!container) {
      console.log('No container found')
      return
    }

    console.log('Starting to add legends...')
    setIsAddingLegends(true)

    // Remove existing legends
    const existingLegends = container.querySelectorAll('.custom-layer-legend')
    console.log(`Removing ${existingLegends.length} existing legends`)
    existingLegends.forEach(legend => legend.remove())

    // Find all checked layers
    const checkedInputs = container.querySelectorAll('input:checked')
    console.log(`Found ${checkedInputs.length} checked inputs`)
    
    // Process each checked layer
    const processedLayers = new Set<string>()
    
    for (const input of checkedInputs) {
      const label = input.closest('label')
      if (!label) continue
      
      const labelText = label.textContent?.trim() || ''
      
      // Check if this label matches any of our layers
      for (const [layerName, config] of Object.entries(layerConfigs)) {
        if (labelText.includes(layerName) || layerName.includes(labelText)) {
          // Skip if we already processed this layer
          if (processedLayers.has(layerName)) {
            console.log(`Already processed ${layerName}, skipping...`)
            continue
          }
          
          processedLayers.add(layerName)
          console.log(`Processing layer: ${layerName}`)
          
          // Fetch JSON legend
          const legendData = await fetchLegendData(layerName)
          
          // Create legend container
          const legendContainer = document.createElement('div')
          legendContainer.className = 'custom-layer-legend'
          
          if (legendData) {
            // Render JSON legend
            legendContainer.innerHTML = `
              <div class="legend-header">${layerName}</div>
              ${renderLegend(legendData)}
            `
          } else {
            // No legend data available
            legendContainer.innerHTML = `
              <div class="legend-header">${layerName}</div>
              <div class="no-legend">No JSON legend available</div>
            `
          }
          
          // Insert after label
          label.parentNode?.insertBefore(legendContainer, label.nextSibling)
          break
        }
      }
    }
    
    console.log('Finished adding legends')
    setIsAddingLegends(false)
  }, [isAddingLegends, isExpanded, legendCache])

  // Debounced version of addLegendsToControl
  const debouncedAddLegends = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      addLegendsToControl()
    }, 300)
  }, [addLegendsToControl])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Effect for when control expands or layers change - DEBOUNCED
  useEffect(() => {
    if (isExpanded) {
      debouncedAddLegends()
    }
  }, [isExpanded, activeLayers, debouncedAddLegends])

  // Observe control expansion/collapse
  useEffect(() => {
    if (!controlRef.current) return
    
    const container = controlRef.current.getContainer()
    if (!container) return

    const observer = new MutationObserver(() => {
      const expanded = !container.classList.contains('leaflet-control-layers-collapsed')
      setIsExpanded(expanded)
      if (expanded) {
        debouncedAddLegends()
      }
    })

    observer.observe(container, { attributes: true })
    return () => observer.disconnect()
  }, [debouncedAddLegends])

  // Initial load - DEBOUNCED
  useEffect(() => {
    if (controlRef.current && isExpanded) {
      debouncedAddLegends()
    }
  }, [controlRef.current, isExpanded, debouncedAddLegends])

  // Listen for checkbox changes - DEBOUNCED
  useEffect(() => {
    if (!controlRef.current || !isExpanded) return

    const container = controlRef.current.getContainer()
    if (!container) return

    const handleChange = () => {
      debouncedAddLegends()
    }

    container.addEventListener('change', handleChange)
    return () => container.removeEventListener('change', handleChange)
  }, [controlRef.current, isExpanded, debouncedAddLegends])

  return (
    <LayersControl 
      ref={(instance: any) => {
        if (instance) {
          const leafletElement = instance._leafletElement || instance
          controlRef.current = leafletElement
          
          const container = leafletElement.getContainer()
          if (container) {
            setIsExpanded(!container.classList.contains('leaflet-control-layers-collapsed'))
          }
        }
      }}
      collapsed={collapsed}
    >
      {children}
    </LayersControl>
  )
}