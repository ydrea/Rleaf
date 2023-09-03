import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getPhotos,
  increment,
  decrement,
  setSelectedPhotoIndex, //
  setSelectedPhoto, //
  selectPhotos,
  selectSelectedPhotoIndex,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';

export function Card({ photo }) {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const navigate = useNavigate();

  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];

  //nav to map
  const handleShowOnMap = () => {
    if (selectedPhoto && selectedPhoto.signatura) {
      dispatch(setSelectedPhoto(selectedPhoto));
      navigate(`/mapa/${selectedPhoto.signatura}`);
    }
  };
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
    <div>
      <img
        src={process.env.REACT_APP_SERVER_PUB + `/${photo.signatura}`} //
        alt={photo.naziv}
        width="60vw"
      />
      <div>
        {photo.naziv}, {photo.opis}, {photo.lokacija},{' '}
        {photo.latitude}, {photo.longitude}
      </div>
      <div className="dugmici">
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleShowOnMap}>Show on Map</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
    </div>
  );
}
