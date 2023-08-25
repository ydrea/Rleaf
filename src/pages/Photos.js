import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getPhotos,
  increment,
  decrement,
  setSelectedPhotoIndex, // Correct import
  setSelectedPhoto, // Add this import if you intend to use it later
  selectPhotos,
  selectSelectedPhotoIndex,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';
import './photos.scss';

export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const navigate = useNavigate();

  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];

  //handle onClick
  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
  };

  //nav to map
  const handleShowOnMap = () => {
    if (selectedPhoto && selectedPhoto.signatura) {
      dispatch(setSelectedPhoto(selectedPhoto)); // Store selected photo in Redux store

      navigate(`/mapa/${selectedPhoto.signatura}`);
    }
  };

  //get em all
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //find it
  useEffect(() => {
    const index = photos.findIndex(
      photo => photo.popUp === popUp || photo.signatura === signatura
    );
    if (index !== -1) {
      dispatch(setSelectedPhotoIndex(index));
    }
  }, [dispatch, photos, popUp, signatura]);

  //prev/next
  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  return (
    <div className="gallery">
      <div>
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
      {selectedPhoto && <Card photo={selectedPhoto} />}
      {selectedPhoto && (
        <div>
          <button onClick={handleShowOnMap}>Show on Map</button>
        </div>
      )}
      {/* Render the list of photos as links */}
      <div className="photo-container">
        {photos.map(photo => (
          <Link to={`/photos/${photo.signatura}`} key={photo.id}>
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              style={{ width: '400px' }}
              onClick={() => handlePhotoClick(photos.indexOf(photo))}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
