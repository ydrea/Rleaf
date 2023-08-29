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
import { Card } from '../comps/Card';
import Footer from '../comps/Footer';
import './photos.css';
import { Button } from 'reactstrap';

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
      {selectedPhoto && (
        <Card photo={selectedPhoto} className="card" />
      )}
      <div className="dugmici">
        <Button
          style={{
            borderBottomWidth: '3px',
            borderBottomColor: 'white',
            borderTopWidth: '3px',
            borderTopColor: 'white',
            borderLeftWidth: '3px',
            borderLeftColor: 'white',
            borderRightColor: '#8c8d85',
            backgroundColor: '#8c8d85',
            fontKerning: '1.5',
          }}
          onClick={handlePreviousPhoto}
        >
          Previous Photo
        </Button>
        <Button
          style={{
            borderBottomWidth: '3px',
            borderBottomColor: 'white',
            borderTopWidth: '3px',
            borderTopColor: 'white',
            borderLeftWidth: '3px',
            borderLeftColor: 'white',
            borderRightColor: '#8c8d85',
            backgroundColor: '#8c8d85',
            fontKerning: '1.5',
          }}
          onClick={handleShowOnMap}
        >
          Show on Map
        </Button>
        <Button
          style={{
            borderBottomWidth: '3px',
            borderBottomColor: 'white',
            borderTopWidth: '3px',
            borderTopColor: 'white',
            borderLeftWidth: '3px',
            borderLeftColor: 'white',
            borderRightColor: '#8c8d85',
            backgroundColor: '#8c8d85',
            fontKerning: '1.5',
          }}
          onClick={handleNextPhoto}
        >
          Next Photo
        </Button>
      </div>
      {/* Render the list of photos as links */}
      <div className="photo-container">
        {photos.map(photo => (
          <Link to={`/photos/${photo.signatura}`} key={photo.id}>
            <div className="photo">
              {' '}
              <img
                className="photo-img"
                src={
                  process.env.REACT_APP_SERVER_PUB +
                  `/${photo.signatura}`
                }
                alt={photo.naziv}
                style={{ width: '400px' }}
                onClick={() =>
                  handlePhotoClick(photos.indexOf(photo))
                }
              />
              <div className="overlay"></div>
            </div>{' '}
          </Link>
        ))}
      </div>
      <Footer />{' '}
    </div>
  );
}
