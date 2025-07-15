import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectFilteredPhotos
} from '../../redux/rtk/gallerySlice'
import type { Photo } from '../../types/types'
import { Pagination } from './components:Pagination/Pagination'
import { TagoviSelekt } from '../../components/SelektT/SelektT'
import { useAppDispatch } from '../../redux/hooks'
import { KategorijeSelekt } from '../../components/SelektK/SelektK'
import './Photos.sass'
import { Section } from '../../components/Section/Section'

export const Photos = ({ photosPerPage = 20 }: { photosPerPage?: number }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const photos = useSelector(selectPhotos)
  const [, showPhotoSet] = useState(false)
  const filteredPhotos = useSelector(selectFilteredPhotos)
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const [loading, setLoading] = useState(photos.length === 0)

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  useEffect(() => {
    if (photos.length > 0) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [photos])

  const tagoviSet = new Set<string>()

  photos.forEach((photo) => {
    photo.tagovi.split(',').forEach((tag) => {
      tagoviSet.add(tag.trim())
    })
  })

  const tagoviOptions = Array.from(tagoviSet).map((tag) => ({
    value: tag,
    label: tag
  }))

  const handlePhotoClick = (index: number) => {
    const originalIndex = photos.indexOf(photosToDisplay[index])

    dispatch(setSelectedPhotoIndex(originalIndex))
    showPhotoSet(true)
    navigate(`/photos/${photos[originalIndex].signatura}#imgcnt`)
  }

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * photosPerPage
  const endIndex = startIndex + photosPerPage

  // Slice the photos array for the current page
  const photosToDisplay = filteredPhotos.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)

  return (
    <div>
      <section className='select-container'>
        <KategorijeSelekt />
        <div className='selectxt'>
          Odabrano <strong>{filteredPhotos.length}</strong> fotografija
        </div>
        <TagoviSelekt tagoviOptions={tagoviOptions} />
      </section>
      {loading && <Section className='loader'>Učitavanje...</Section>}
      {!loading && (
        <>
          <Pagination totalPages={totalPages} top />
          <div className='photos-container' id='photos-container'>
            {photosToDisplay && photosToDisplay.length > 0 ? (
              photosToDisplay.map((photo: Photo, index: number) => (
                <div key={photo.id} className='photo'>
                  <img
                    src={import.meta.env.VITE_SERVER_PUB + `/thumbs/${photo.signatura}`}
                    alt={photo.naziv}
                    onClick={() => handlePhotoClick(index)}
                  />
                  <ul className='photo-data'>
                    {[
                      photo.signatura.replace(/\.[^.]*$/, ''),
                      photo.opis,
                      photo.lokacija,
                      new Date(photo.datum_sni).toLocaleDateString('hr-HR')
                    ]
                      .filter((text) => text && text.trim() !== '')
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>Nema fotografije po zadanim kriterijima</p>
            )}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      )}

      <Section dark style={{ marginBottom: '-96px' }}>
        Fototeka Opservatorija krajobraza čuva slikovne priče krajobraza, dokumentirajući ih kroz
        različite teme, projekte i vremenske okvire. Svaka slika je pažljivo odabrana, opremljena
        detaljnim informacijama i, gdje je to moguće, preciznim geografskim koordinatama.
      </Section>
    </div>
  )
}
