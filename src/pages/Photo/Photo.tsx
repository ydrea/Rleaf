import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'

import {
  selectPhotos,
  getPhotos,
  setSelectedPhotoIndex,
  selectSelectedPhotoIndex,
  selectFilteredPhotos
} from '../../redux/rtk/gallerySlice'
import { useAppDispatch } from '../../redux/hooks'
import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'
import { Loader } from '../../components/Loader/Loader'
import './Photo.sass'

export const Photo = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { photoId } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVertical, setIsVertical] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex)
  const filteredPhotos = useSelector(selectFilteredPhotos)
  const photos = useSelector(selectPhotos)

  const selectedPhoto = filteredPhotos[selectedPhotoIndex]

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

  const isVerticalImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const width = e.currentTarget.width ?? 0
    const height = e.currentTarget.height ?? 0

    setIsVertical(width < height)
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedPhoto])

  useEffect(() => {
    if (filteredPhotos.length === 0 && loading) {
      dispatch(getPhotos(() => setLoading(false)))
    }

    if (filteredPhotos.length > 0 && loading) {
      setLoading(false)
    }
  }, [dispatch, filteredPhotos.length, loading])

  useEffect(() => {
    setIsVertical(false)
  }, [photoId])

  useEffect(() => {
    const photoIndex = filteredPhotos.findIndex((photo) => photo.id === Number(photoId))

    dispatch(setSelectedPhotoIndex(photoIndex))
    setNotFound(filteredPhotos.length > 0 && photoIndex === -1)
  }, [dispatch, photos, photoId, filteredPhotos])

  if (loading) {
    return <Loader />
  }

  if (notFound) {
    return (
      <p style={{ textAlign: 'center', margin: '100px 0' }}>
        Fotografija nije pronađena
        <br />
        <Link to='/photos'>Povratak u galeriju</Link>
      </p>
    )
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

          {selectedPhoto?.signatura && (
            <div className={`single-image ${isVertical ? 'vertical' : ''}`}>
              <ImageWithSuspense
                src={`${import.meta.env.VITE_SERVER_PUB}/${selectedPhoto.signatura}`}
                alt={selectedPhoto.naziv}
                onLoad={isVerticalImage}
              />
            </div>
          )}

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
