useEffect(() => {
  const preloadVisibleTiles = async () => {
    const zoom = 10
    const center = { lat: 45.2, lng: 16.2 }

    // Convert lat/lng to tile coordinates
    const latRad = (center.lat * Math.PI) / 180
    const n = Math.pow(2, zoom)
    const x = Math.floor(((center.lng + 180) / 360) * n)
    const y = Math.floor(
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
    )

    // Order matters: base layer first, then overlays top-down
    const layers = [
      'https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg',
      'https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png',
      'https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png',
    ]

    // Small helper that waits a tick so we yield to the browser between layers
    const tick = () => new Promise((r) => setTimeout(r, 0))

    for (const template of layers) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          const url = template
            .replace('{z}', zoom.toString())
            .replace('{x}', (x + dx).toString())
            .replace('{y}', (y + dy).toString())

          fetch(url, { mode: 'no-cors' }).catch(() => {})
        }
      }
      // Yield between layers so the base layer's fetches get a head start
      await tick()
    }
  }

  preloadVisibleTiles()
}, [])