// // import { useMap } from 'react-leaflet'
// // import { useEffect } from 'react'
// // import { useParams } from 'react-router-dom'
// // import { useSelector } from 'react-redux'

// // import type { RootState } from '../../../../redux/store'

// // export const SingleMarker = () => {
// //   const { photoId } = useParams()
// //   const markerData = useSelector((state: RootState) =>
// //     state.gallery.photos.find((photo) => photo.id === Number(photoId))
// //   )

// //   const geojsonObject = JSON.parse(markerData?.geojson ?? '{}')
// //   const coordinates = geojsonObject?.coordinates ?? []

// //   const lat = parseFloat(coordinates[0])
// //   const lng = parseFloat(coordinates[1])

// //   // fly
// //   const map = useMap()

// //   useEffect(() => {
// //     if (photoId && markerData && markerData.geojson) {
// //       if (lat !== undefined && lng !== undefined) {
// //         map.flyTo([lng, lat], 20)
// //       } else {
// //         console.error('Invalid coordinates:', lat, lng)
// //       }
// //     simulateMarkerClick();
// //     }
// //   }, [photoId, markerData, lat, lng, map])

// //   return null
// // }

// // // helper function to handle simulateMarkerClick 
// // export const simulateMarkerClick = () => {
// //   setTimeout(() => {
// //     const markerElement = document.querySelector('.custom-marker-container');
// //     if (markerElement) {
// //       markerElement.dispatchEvent(new MouseEvent('click', {
// //         view: window,
// //         bubbles: true,
// //         cancelable: true
// //       }));
// //      }
// //   }, 1000); //
// // };
// // import { useMap } from 'react-leaflet'
// // import { useEffect } from 'react'
// // import { useParams } from 'react-router-dom'
// // import { useSelector } from 'react-redux'
// // import L from 'leaflet'

// // import type { RootState } from '../../../../redux/store'

// // export const SingleMarker = () => {
// //   const { photoId } = useParams()
// //   const map = useMap()
  
// //   const markerData = useSelector((state: RootState) =>
// //     state.gallery.photos.find((photo) => photo.id === Number(photoId))
// //   )

// //   useEffect(() => {
// //     if (!photoId || !markerData || !markerData.geojson) return

// //     try {
// //       const geojsonObject = JSON.parse(markerData.geojson)
// //       const coordinates = geojsonObject?.coordinates ?? []
      
// //       if (coordinates.length < 2) {
// //         console.error('Invalid coordinates:', coordinates)
// //         return
// //       }

// //       // GeoJSON is [lng, lat]
// //       const lng = parseFloat(coordinates[0])
// //       const lat = parseFloat(coordinates[1])
      
// //       if (isNaN(lat) || isNaN(lng)) {
// //         console.error('Invalid coordinate values:', lat, lng)
// //         return
// //       }

// //       const latLng = L.latLng(lat, lng)
      
// //       // Fly to the location
// //       map.flyTo(latLng, 18, { duration: 1.5 })
      
// //       // 🔥 DIRECT APPROACH: Create and open popup programmatically
// //       // Instead of simulating a click, create the popup directly
      
// //       // Small delay to ensure flyTo completes
// //       setTimeout(() => {
// //         // Create popup content
// //         const popupContent = document.createElement('div')
// //         popupContent.className = 'photo-popup-content'
// //         popupContent.innerHTML = `
// //           <ul style="margin:0 0 10px 0; padding:0 0 0 10px; border:1px solid black;">
// //             <li><strong>Signatura:</strong> ${markerData.signatura}</li>
// //             <li><strong>Lokacija:</strong> ${markerData.lokacija || '—'}</li>
// //             <li><strong>Datum:</strong> ${markerData.datum_sni || '—'}</li>
// //             <li><strong>Kategorija:</strong> ${markerData.kategorija || '—'}</li>
// //             <li><strong>Autor:</strong> ${markerData.autor || '—'}</li>
// //             <li><strong>Tagovi:</strong> ${markerData.tagovi || '—'}</li>
// //           </ul>
// //           <div style="text-align:center;">
// //             <img 
// //               src="${import.meta.env.VITE_SERVER_PUB}/${markerData.signatura}" 
// //               alt="${markerData.naziv}"
// //               style="max-width:100%; max-height:200px; object-fit:contain;"
// //               onerror="this.style.display='none'; this.parentElement.innerHTML+='<div>🖼️ Image not available</div>';"
// //             />
// //           </div>
// //         `
        
// //         // Open popup at location
// //         L.popup({ maxWidth: 300 })
// //           .setLatLng(latLng)
// //           .setContent(popupContent)
// //           .openOn(map)
          
// //       }, 500) // Wait for flyTo
      
// //     } catch (error) {
// //       console.error('Error creating marker popup:', error)
// //     }
// //   }, [photoId, markerData, map])

// //   return null
// // }
// import { useMap } from 'react-leaflet'
// import { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import L from 'leaflet'

// import type { RootState } from '../../../../redux/store'

// export const SingleMarker = () => {
//   const { photoId } = useParams()
//   const map = useMap()
  
//   const markerData = useSelector((state: RootState) =>
//     state.gallery.photos.find((photo) => photo.id === Number(photoId))
//   )

//   useEffect(() => {
//     if (!photoId || !markerData || !markerData.geojson) return

//     try {
//       const geojsonObject = JSON.parse(markerData.geojson)
//       const coordinates = geojsonObject?.coordinates ?? []
      
//       if (coordinates.length < 2) {
//         console.error('Invalid coordinates:', coordinates)
//         return
//       }

//       // GeoJSON is [lng, lat]
//       const lng = parseFloat(coordinates[0])
//       const lat = parseFloat(coordinates[1])
      
//       if (isNaN(lat) || isNaN(lng)) {
//         console.error('Invalid coordinate values:', lat, lng)
//         return
//       }

//       const latLng = L.latLng(lat, lng)
      
//       // Fly to the location
//       map.flyTo(latLng, 18, { duration: 1.5 })
      
//       // Small delay to ensure flyTo completes
//       // setTimeout(() => {
//         // Create popup content
//  setTimeout(() => {
//   // Create popup content HTML string
//   const popupHTML = `
//     <div class="leaflet-popup-content" style="margin: 0;">
//       <div class="popup-content">
//         <ul style="margin:0 0 0px 0; padding:0 0 0 0px; border:1px solid black;">
//           <li><strong>Signatura:</strong> ${markerData.signatura}</li>
//           <li><strong>Datum:</strong> ${markerData.datum_sni || '—'}</li>
//           <li><strong>Kategorija:</strong> ${markerData.kategorija || '—'}</li>
//           <li><strong>Autor:</strong> ${markerData.autor || '—'}</li>
//           <li><strong>Tagovi:</strong> ${markerData.tagovi || '—'}</li>
//         </ul>
//         <div style="text-align:center;">
//           <img 
//             src="${import.meta.env.VITE_SERVER_PUB}/${markerData.signatura}" 
//             alt="${markerData.naziv}"
//             style="max-width:100%; max-height:200px; object-fit:contain;"
//             onerror="this.style.display='none'; this.parentElement.innerHTML+='<div>🖼️ Image not available</div>';"
//           />
//         </div>
//       </div>
//     </div>
//   `
  
//   // Open popup at location - pass HTML string directly
//   L.popup({ 
//     maxWidth: 300, 
//     autoPan: true, 
//     autoPanPadding: [40, 40] 
//   })
//     .setLatLng(latLng)
//     .setContent(popupHTML) // Pass HTML string, not container element
//     .openOn(map)
    
// }, 500)     
//     } catch (error) {
//       console.error('Error creating marker popup:', error)
//     }
//   }, [photoId, markerData, map])

//   return null
// }
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
      
      map.flyTo(latLng, 18, { duration: 1.5 })
      
      setTimeout(() => {
        const formattedDate = markerData.datum_sni 
          ? new Date(markerData.datum_sni).toLocaleDateString('hr') 
          : '—'
        
        // Using your EXISTING SASS classes from Karta.sass
        const popupHTML = `
          <div class="photo-popup">
            <ul>
              <li>
                <span class="label">Signatura</span>
                <span class="value">${markerData.signatura}</span>
              </li>
              <li>
                <span class="label">Datum</span>
                <span class="value">${formattedDate}</span>
              </li>
              <li>
                <span class="label">Kategorija</span>
                <span class="value">${markerData.kategorija || '—'}</span>
              </li>
              <li>
                <span class="label">Autor</span>
                <span class="value">${markerData.autor || '—'}</span>
              </li>
              <li>
                <span class="label">Tagovi</span>
                <span class="value">${markerData.tagovi || '—'}</span>
              </li>
            </ul>
            
            <a href="/photos/${markerData.id}">
              <img 
                src="${import.meta.env.VITE_SERVER_PUB}/${markerData.signatura}" 
                alt="${markerData.naziv || 'Photo'}"
                onerror="this.style.display='none'; this.parentElement.innerHTML+='<div>🖼️ Image not available</div>';"
              />
            </a>
          </div>
        `
        
        L.popup({ 
          className: 'photo-popup',
          maxWidth: 320, 
          autoPan: true, 
          autoPanPadding: [40, 40] 
        })
          .setLatLng(latLng)
          .setContent(popupHTML)
          .openOn(map)
          
      }, 500)
      
    } catch (error) {
      console.error('Error creating marker popup:', error)
    }
  }, [photoId, markerData, map])

  return null
}