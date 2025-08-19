import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'

import {
  setSelectedPhoto,
  selectPhotos,
  getPhotos,
  setSelectedPhotoIndex,
  selectSelectedPhotoIndex,
  selectFilteredPhotos
} from '../../redux/rtk/gallerySlice'
import { useAppDispatch } from '../../redux/hooks'
import './Photo.sass'

export const Photo = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { photoId } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVertical, setIsVertical] = useState(false)
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex)
  const filteredPhotos = useSelector(selectFilteredPhotos)
  const photos = useSelector(selectPhotos)
  const imageRef = useRef<HTMLImageElement>(null)
  const imageLoadersSet = useRef(false)

  const handleBackToGallery = () => {
    navigate('/photos')
  }

  const handleShowOnMap = () => {
    navigate(`/maps/${photoId}`)
  }

  const navigateToPreviousImage = () => {
    if (selectedPhotoIndex > 0) {
      navigate(`/photos/${filteredPhotos[selectedPhotoIndex - 1].id}`)
    }
  }

  const navigateToNextImage = () => {
    if (selectedPhotoIndex < filteredPhotos.length - 1) {
      navigate(`/photos/${filteredPhotos[selectedPhotoIndex + 1].id}`)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: navigateToNextImage,
    onSwipedRight: navigateToPreviousImage,
    trackMouse: true
  })

  const selectedPhoto = filteredPhotos[selectedPhotoIndex]

  const isVerticalImage = () => {
    const width = imageRef.current?.width ?? 0
    const height = imageRef.current?.height ?? 0

    setIsVertical(width < height)
  }

  if (imageRef.current && !imageLoadersSet.current) {
    imageLoadersSet.current = true

    if (imageRef.current.complete) {
      isVerticalImage()
    } else {
      imageRef.current.onload = isVerticalImage
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedPhoto])

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  useEffect(() => {
    const photoIndex = filteredPhotos.findIndex((photo) => {
      if (photo.id === Number(photoId)) {
        dispatch(setSelectedPhoto(photo))
        return true
      }

      return false
    })

    dispatch(setSelectedPhotoIndex(photoIndex))
  }, [dispatch, photos, photoId, filteredPhotos])

  if (!selectedPhoto) {
    return <div>Photo not found</div>
  }

  return (
    <div {...handlers}>
      <div id='single-image-container' ref={containerRef}>
        <div className='navigation'>
          <div onClick={handleBackToGallery} className='cc-link'>
            natrag u galeriju
          </div>
          <div className='cc'>
            {selectedPhotoIndex + 1} / {filteredPhotos.length}
          </div>
          <div onClick={handleShowOnMap} className='cc-link'>
            pokaži na karti
          </div>
        </div>
        <div className='image-wrapper'>
          {selectedPhotoIndex > 0 && (
            <div className='next-prev-cnt prev' onClick={navigateToPreviousImage}>
              <FaChevronLeft size={48} />
            </div>
          )}

          <div className={`single-image ${isVertical ? 'vertical' : ''}`}>
            <img
              src={
                selectedPhoto ? `${import.meta.env.VITE_SERVER_PUB}/${selectedPhoto.signatura}` : ''
              }
              alt={selectedPhoto.naziv}
              ref={imageRef}
            />
          </div>

          {selectedPhotoIndex < filteredPhotos.length - 1 && (
            <div className='next-prev-cnt next' onClick={navigateToNextImage}>
              <FaChevronRight size={48} />
            </div>
          )}
        </div>
        <div className='photo-data'>
          {selectedPhoto.signatura && (
            <div className='photo-data-item'>
              <div>signatura:</div>
              <div>{selectedPhoto.signatura.replace(/\.[^.]*$/, '')}</div>
            </div>
          )}
          {selectedPhoto.kategorija && (
            <div className='photo-data-item'>
              <div>kategorija:</div>
              <div>{selectedPhoto.kategorija}</div>
            </div>
          )}
          {selectedPhoto.lokacija && (
            <div className='photo-data-item'>
              <div>lokacija:</div>
              <div>{selectedPhoto.lokacija}</div>
            </div>
          )}
          {selectedPhoto.opis && (
            <div className='photo-data-item'>
              <div>opis:</div>
              <div>{selectedPhoto.opis}</div>
            </div>
          )}
          {selectedPhoto.autor && (
            <div className='photo-data-item'>
              <div>autor:</div>
              <div>{selectedPhoto.autor}</div>
            </div>
          )}
          {selectedPhoto.tagovi && (
            <div className='tag'>ključne riječi | {selectedPhoto.tagovi}</div>
          )}
        </div>
      </div>
    </div>
  )
}
