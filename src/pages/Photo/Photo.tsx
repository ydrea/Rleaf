import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link, NavLink } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'
import { useHotkeys } from '@mantine/hooks'

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

  const tags = selectedPhoto
    ? selectedPhoto.tagovi
        .split(',')
        .map((tag) => tag.trim())
        .join(', ')
    : ''

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

  useHotkeys([
    ['ArrowLeft', navigateToPreviousImage],
    ['ArrowRight', navigateToNextImage]
  ])

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
      <div className='single-image-container container' ref={containerRef}>
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
        <div className='image-footer'>
          <ul className='photo-data'>
            {selectedPhoto.signatura && (
              <li>signatura: {selectedPhoto.signatura.replace(/\.[^.]*$/, '')}</li>
            )}
            {selectedPhoto.kategorija && <li>kategorija: {selectedPhoto.kategorija}</li>}
            {selectedPhoto.lokacija && <li>lokacija: {selectedPhoto.lokacija}</li>}
            {selectedPhoto.opis && <li>opis: {selectedPhoto.opis}</li>}
            {selectedPhoto.autor && <li>fotograf: {selectedPhoto.autor}</li>}
            {tags && <li>ključne riječi: {tags}</li>}
          </ul>
          <ul className='photo-data'>
            <li className='cc'>
              {selectedPhotoIndex + 1} / {filteredPhotos.length}
            </li>
            <li>
              <NavLink to={`/maps/${photoId}`}>pokaži na karti</NavLink>
            </li>
            <li>
              <NavLink to='/photos'>natrag u galeriju</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
