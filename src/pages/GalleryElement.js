import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectPhotoIndex,
  getPhotos,
  selectPhotos,
  selectSelectedPhotoIndex,
  increment,
  decrement,
  setSelectedPhotoIndex,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';
import { Photo } from '../comps/Photo';

export default function GalleryElement() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];
  const { signatura } = useParams(); // Retrieve 'signatura' from the URL parameter
  console.log('GalleryElement rendered');
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  useEffect(() => {
    // Find the index of the photo with matching 'signatura'
    const index = photos.findIndex(
      photo => photo.signatura === signatura
    );
    if (index !== -1) {
      dispatch(setSelectedPhotoIndex(index));
    }
  }, [dispatch, photos, signatura]);

  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  return (
    <div className="gallery">
      {selectedPhoto && (
        <Photo selectedPhoto={selectedPhoto} signatura={signatura} />
      )}
      {/* {selectedPhoto && (
        <div>
          <img
            src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.popUp}`}
            alt={selectedPhoto.naziv}
          />
          <div>
            {selectedPhoto.naziv}, {selectedPhoto.opis},{' '}
            {selectedPhoto.lokacija}, {selectedPhoto.latitude},{' '}
            {selectedPhoto.longitude}
          </div>
        </div>
      )} */}
    </div>
  );
}
