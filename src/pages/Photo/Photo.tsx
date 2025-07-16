import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
  const { signatura } = useParams()

  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex)
  const filteredPhotos = useSelector(selectFilteredPhotos)
  const photos = useSelector(selectPhotos)

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  useEffect(() => {
    const photoIndex = filteredPhotos.findIndex((photo) => {
      dispatch(setSelectedPhoto(photo.signatura))
      return photo.signatura === signatura
    })

    dispatch(setSelectedPhotoIndex(photoIndex))
  }, [dispatch, photos, signatura])

  const selectedPhoto = filteredPhotos[selectedPhotoIndex]

  if (!selectedPhoto) {
    return <div>Photo not found</div>
  }

  //to gallery
  const handleBackToGallery = () => {
    navigate('/photos')
  }

  //show on map
  const handleShowOnMap = () => {
    dispatch(setSelectedPhoto(signatura))
    navigate(`/maps/${signatura}#mapcnt`)
  }

  //remove .ext
  const removeFileExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex === -1) {
      return fileName //
    }
    return fileName.substring(0, lastDotIndex)
  }

  return (
    <div id='imgcnt' className='cont'>
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
          <div
            className='next-prev-cnt prev'
            onClick={() => {
              navigate(`/photos/${filteredPhotos[selectedPhotoIndex - 1].signatura}`)
            }}
          >
            <FaChevronLeft size={48} />
          </div>
        )}
        <div className='img-cnt'>
          <img
            src={
              selectedPhoto ? `${import.meta.env.VITE_SERVER_PUB}/${selectedPhoto.signatura}` : ''
            }
            alt={selectedPhoto.naziv}
          />
        </div>

        {selectedPhotoIndex < filteredPhotos.length - 1 && (
          <div
            className='next-prev-cnt next'
            onClick={() => {
              navigate(`/photos/${filteredPhotos[selectedPhotoIndex + 1].signatura}`)
            }}
          >
            <FaChevronRight size={48} />
          </div>
        )}
      </div>
      <div className='photo-data'>
        {selectedPhoto.signatura && (
          <div className='photo-data-item'>
            <div>signatura:</div>
            <div>{removeFileExtension(selectedPhoto.signatura)}</div>
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
        {selectedPhoto.tagovi && <div className='tag'>ključne riječi | {selectedPhoto.tagovi}</div>}
      </div>
    </div>
  )
}
