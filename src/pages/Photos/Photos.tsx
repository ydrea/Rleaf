import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Masonry from 'react-masonry-css'

import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectFilteredPhotos
} from '../../redux/rtk/gallerySlice'
import type { Photo } from '../../types/types'
import { TagoviSelekt } from '../../components/SelektT/SelektT'
import { useAppDispatch } from '../../redux/hooks'
import { KategorijeSelekt } from '../../components/SelektK/SelektK'
import './Photos.sass'

export const Photos = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const photos = useSelector(selectPhotos)
  const [, showPhotoSet] = useState(false)
  const filteredPhotos = useSelector(selectFilteredPhotos)

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  //filtri
  const tagoviSet = new Set<string>()
  const kategorijeSet = new Set<string>()

  photos.forEach((photo) => {
    const tagoviArray = photo.tagovi.split(',')

    tagoviArray.forEach((tag) => {
      tagoviSet.add(tag.trim())
    })

    kategorijeSet.add(photo.kategorija)
  })

  const tagoviOptions = Array.from(tagoviSet).map((tag: string) => ({
    value: tag,
    label: tag
  }))

  const removeFileExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex === -1) {
      return fileName //
    }
    return fileName.substring(0, lastDotIndex)
  }

  const handlePhotoClick = (index: number) => {
    const originalIndex = photos.indexOf(photosToDisplay[index])

    dispatch(setSelectedPhotoIndex(originalIndex))
    showPhotoSet(true)
    navigate(`/photos/${photos[originalIndex].signatura}#imgcnt`)
  }

  const breakpoints = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1
  }

  const photosPerPage = 12
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * photosPerPage
  const endIndex = startIndex + photosPerPage

  // Slice the photos array for the current page
  const photosToDisplay = filteredPhotos.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)

  // Create an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div>
      <section className='select-container'>
        <KategorijeSelekt />
        <div className='selectxt'>
          Odabrano <span>{filteredPhotos.length}</span> <br />
          fotografija
        </div>
        <TagoviSelekt tagoviOptions={tagoviOptions} />
      </section>
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {photosToDisplay && photosToDisplay.length > 0 ? (
          photosToDisplay.map((photo: Photo, index: number) => (
            <div key={photo.id} className='photo'>
              <img
                src={import.meta.env.REACT_APP_SERVER_PUB + `/thumbs/${photo.signatura}`}
                alt={photo.naziv}
                onClick={() => handlePhotoClick(index)}
              />
              <div className='selected-div2'>{removeFileExtension(photo.signatura)}</div>
            </div>
          ))
        ) : (
          <p>Nema fotografije po zadanim kriterijima</p>
        )}
      </Masonry>
      <div className='pagination'>
        {currentPage > 1 && <button onClick={() => handlePageChange(1)}>Početna</button>}

        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Prethodna</button>
        )}

        {pageNumbers.map((pageNumber) => {
          if (pageNumber >= currentPage - 3 && pageNumber <= currentPage + 3 && pageNumber !== 0) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
              >
                {pageNumber}
              </button>
            )
          }
          return null
        })}

        {currentPage < pageNumbers.length && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Sljedeća</button>
        )}

        {currentPage < pageNumbers.length && (
          <button onClick={() => handlePageChange(pageNumbers.length)}>Posljednja</button>
        )}
      </div>
    </div>
  )
}
