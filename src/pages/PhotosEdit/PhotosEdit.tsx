import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Masonry from 'react-masonry-css'

import { getPhotos, selectPhotos, selectFilteredPhotos } from '../../redux/rtk/gallerySlice'
import { Selekt } from '../../components/Selekt/Selekt'
import { Form } from '../../components/Form/Form'
import { Modal } from '../../components/Modal/Modal'
import { useAppDispatch } from '../../redux/hooks'
import type { Photo } from '../../types/types'
import '../Photos/Photos.sass'

export const PhotosEdit = ({ onRemove }: { onRemove: (photo: Photo) => Promise<boolean> }) => {
  const dispatch = useAppDispatch()
  const photos = useSelector(selectPhotos)
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)

  const selectedPhotoData = useMemo(() => {
    if (!photos?.length || !selectedId) {
      return undefined
    }
    return photos.find((photo) => photo.id === selectedId)
  }, [photos, selectedId])

  const filteredPhotos = useSelector((state) => selectFilteredPhotos(state))

  const [isRemoving, setIsRemoving] = useState(false)
  const handleRemove = async (photo: Photo) => {
    const photoLabel = `id: ${photo.id}${photo.signatura ? ` (${photo.signatura})` : ''}`
    if (window.confirm(`Izbrisati ${photoLabel}?`)) {
      setIsRemoving(true)
      const isRemoved = await onRemove(photo)
      if (isRemoved) {
        setSelectedId(undefined)
      }
      setIsRemoving(false)
    }
  }

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  const breakpoints = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1
  }

  const photosPerPage = 40
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * photosPerPage
  const endIndex = startIndex + photosPerPage

  const photosToDisplay = filteredPhotos.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
  const sortedPhotos = [...photosToDisplay].sort((a, b) => b.id - a.id)

  return (
    <div className='gallery'>
      <div className='photo-filters'>
        <Selekt />
      </div>
      <div className='photo-container'>
        <Modal
          isOpen={!!selectedId}
          closeModal={() => setSelectedId(undefined)}
          thumbnailUrl={
            selectedPhotoData
              ? `${import.meta.env.VITE_SERVER_PUB}/thumbs/${selectedPhotoData.signatura}`
              : undefined
          }
          signatura={selectedPhotoData ? selectedPhotoData.signatura : undefined}
        >
          {selectedPhotoData ? (
            <>
              <p style={{ color: 'white' }}>
                Signatura: {selectedPhotoData.signatura}
                <br />
                id: {selectedPhotoData.id}
              </p>
              {typeof onRemove === 'function' && (
                <button
                  type='button'
                  disabled={isRemoving}
                  onClick={() => handleRemove(selectedPhotoData)}
                >
                  {isRemoving ? 'Brisanje...' : 'IZBRIŠI'}
                </button>
              )}
              <Form uploadedFile={selectedPhotoData} />
            </>
          ) : (
            <p style={{ color: 'white' }}>
              Photo with id <strong>{selectedId}</strong> not found!
            </p>
          )}
        </Modal>
        <Masonry
          breakpointCols={breakpoints}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {sortedPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`photo ${photo.id === selectedId ? 'selected' : ''}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                minHeight: 60,
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedId(photo.id)}
            >
              <div>{photo.signatura}</div>
              {photo.id === selectedId && (
                <div className='selected-div1'>
                  <p>{photo.naziv}</p>
                  <p>{photo.tagovi}</p>
                  <p>{photo.kategorija}</p>
                  <p>{photo.opis}</p>
                  <p>{photo.signatura}</p>
                </div>
              )}
              {photo.signatura ? (
                <img
                  src={`${import.meta.env.VITE_SERVER_PUB}/thumbs/${photo.signatura}`}
                  alt={photo.naziv || photo.signatura}
                />
              ) : (
                <span>id: {photo.id}</span>
              )}
            </div>
          ))}
        </Masonry>
      </div>{' '}
      <div className='pagination'>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Prethodna</button>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}

        {photosToDisplay.length === photosPerPage && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Sljedeća</button>
        )}
      </div>
    </div>
  )
}
