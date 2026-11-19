// maps/karta/components/SingleMarker
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import L from 'leaflet'

import type { RootState } from '../../../../redux/store'

export const SingleMarker = () => {
  const { photoId } = useParams()
  const map = useMap()
  
  const markerData = useSelector((state: RootState) =>
    state.gallery.photos.find((photo) => photo.id === Number(photoId))
  )

  useEffect(() => {
    if (!photoId || !markerData || !markerData.geojson) return

    try {
      const geojsonObject = JSON.parse(markerData.geojson)
      const coordinates = geojsonObject?.coordinates ?? []
      
      if (coordinates.length < 2) {
        console.error('Invalid coordinates:', coordinates)
        return
      }

      const lng = parseFloat(coordinates[0])
      const lat = parseFloat(coordinates[1])
      
      if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid coordinate values:', lat, lng)
        return
      }

      const latLng = L.latLng(lat, lng)
      
      // 🔥 OVO OSTAJE - samo flyTo, bez popupa
      map.flyTo(latLng, 18, { duration: 1.5 })
      
      // 🔥 OBRISI OVO (cijeli setTimeout blok):
      // setTimeout(() => {
      //   const formattedDate = markerData.datum_sni 
      //     ? new Date(markerData.datum_sni).toLocaleDateString('hr') 
      //     : '—'
      //   
      //   const popupHTML = `...`
      //   
      //   L.popup({ 
      //     className: 'photo-popup',
      //     maxWidth: 320, 
      //     autoPan: true, 
      //     autoPanPadding: [40, 40] 
      //   })
      //     .setLatLng(latLng)
      //     .setContent(popupHTML)
      //     .openOn(map)
      // }, 500)
      
    } catch (error) {
      console.error('Error creating marker popup:', error)
    }
  }, [photoId, markerData, map])

  return null
}