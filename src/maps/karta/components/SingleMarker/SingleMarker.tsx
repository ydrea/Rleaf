import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import type { RootState } from '../../../../redux/store'

export const SingleMarker = () => {
  const { photoId } = useParams()
  const markerData = useSelector((state: RootState) =>
    state.gallery.photos.find((photo) => photo.id === Number(photoId))
  )

  const geojsonObject = JSON.parse(markerData?.geojson ?? '{}')
  const coordinates = geojsonObject?.coordinates ?? []

  const lat = parseFloat(coordinates[0])
  const lng = parseFloat(coordinates[1])

  // fly
  const map = useMap()

  useEffect(() => {
    if (photoId && markerData && markerData.geojson) {
      if (lat !== undefined && lng !== undefined) {
        map.flyTo([lng, lat], 21)
      } else {
        console.error('Invalid coordinates:', lat, lng)
      }
    }
  }, [photoId, markerData, lat, lng, map])

  return null
}
