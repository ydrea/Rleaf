import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectSelectedPhoto } from '../../../../redux/rtk/gallerySlice'

export const SingleMarker = () => {
  const { signatura } = useParams()
  const markerData = useSelector(selectSelectedPhoto)

  const geojsonObject = JSON.parse(markerData?.geojson ?? '{}')
  const coordinates = geojsonObject?.coordinates ?? []

  const lat = parseFloat(coordinates[0])
  const lng = parseFloat(coordinates[1])

  // fly
  const map = useMap()

  useEffect(() => {
    if (signatura && markerData && markerData.geojson) {
      if (lat !== undefined && lng !== undefined) {
        map.flyTo([lng, lat], 21)
      } else {
        console.error('Invalid coordinates:', lat, lng)
      }
    }
  }, [signatura, markerData, lat, lng, map])

  return null
}
