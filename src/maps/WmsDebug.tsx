// Add this component inside your MapContainer
const WMSDebugger = () => {
  const map = useMap()
  
  useEffect(() => {
    console.log('=== WMS DEBUG ===')
    
    // Test WMS URL directly
    const testWMS = async () => {
      const testUrl = 'https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=tema_koristenje_zemljista_novo&FORMAT=image/png&TRANSPARENT=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX=1810000,5680000,1820000,5690000'
      
      console.log('Testing WMS URL:', testUrl)
      
      try {
        const response = await fetch(testUrl)
        console.log('WMS Response status:', response.status, response.statusText)
        
        if (response.ok) {
          console.log('✅ WMS layer is accessible')
        } else {
          console.log('❌ WMS layer failed:', await response.text())
        }
      } catch (error) {
        console.log('❌ WMS fetch error:', error)
      }
    }
    
    testWMS()
    
    // Check what Leaflet is actually requesting
    const checkTiles = () => {
      const tiles = document.querySelectorAll('img[src*="qgis"]')
      console.log(`Found ${tiles.length} WMS tiles`)
      
      tiles.forEach((tile, i) => {
        const src = (tile as HTMLImageElement).src
        console.log(`Tile ${i}:`, src)
        
        // Check if the tile loaded
        tile.addEventListener('load', () => {
          console.log(`Tile ${i} loaded successfully`)
        })
        
        tile.addEventListener('error', () => {
          console.log(`Tile ${i} failed to load`)
        })
      })
    }
    
    setTimeout(checkTiles, 1000)
    
  }, [map])
  
  return null
}

// Then add it to your MapContainer:
<WMSDebugger />