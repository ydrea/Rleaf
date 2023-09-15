import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPhotos,
  getPhotos,
  setSelectedPhotoIndex,
  selectSelectedPhotoIndex,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import { useParams } from 'react-router-dom';
import './photo.css';

export default function Photo() {
  const dispatch = useDispatch();
  const { signatura } = useParams();

  // Use useSelector to access selectedPhotoIndex from the Redux store
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);

  useEffect(() => {
    // Fetch photos if not already loaded
    dispatch(getPhotos());

    // No need to set selectedPhotoIndex here; it's managed in the Redux store
  }, [dispatch]);

  // Retrieve the selected photo
  const photos = useSelector(selectPhotos);
  const selectedPhoto = photos[selectedPhotoIndex];

  if (!selectedPhoto) {
    // Handle the case where the photo with the specified signatura is not found
    return <div>Photo not found</div>;
  }

  return (
    <div className="cont">
      <div className="image-wrapper">
        <button
          className="prev"
          onClick={() => {
            if (selectedPhotoIndex > 0) {
              dispatch(decrement());
            }
          }}
          disabled={selectedPhotoIndex === 0}
        >
          prev
        </button>
        <div>
          <img
            style={{ maxWidth: '60vw' }}
            src={
              selectedPhoto
                ? `${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`
                : ''
            }
            alt={selectedPhoto.naziv}
          />
          <div className="selected-div1">
            <p>{selectedPhoto.naziv}</p>
            <p>{selectedPhoto.tagovi}</p>
            <p>{selectedPhoto.kategorija}</p>
            <p>{selectedPhoto.opis}</p>
            <p>{selectedPhoto.signatura}</p>
          </div>
        </div>

        <button
          className="next"
          onClick={() => {
            if (selectedPhotoIndex < photos.length - 1) {
              dispatch(increment());
            }
          }}
          disabled={selectedPhotoIndex === photos.length - 1}
        >
          next
        </button>
      </div>
    </div>
  );
}
