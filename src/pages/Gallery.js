import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPhotos,
  getAPhoto,
  selectPhotos,
  increment,
  decrement,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';
import { useParams } from 'react-router-dom';
//
function Gallery() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhoto = useSelector(selectAPhoto);
  const { id } = useParams();
  //
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  useEffect(() => {
    if (selectedPhoto === undefined) {
      // Fetch individual photo data when component loads or idX changes
      dispatch(getAPhoto(selectedPhoto?.id));
    }
  }, [dispatch, selectedPhoto]);

  return (
    <div>
      <div>
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
      {selectedPhoto && (
        <div>
          <img
            src={
              process.env.REACT_APP_SERVER_PUB +
              `/${selectedPhoto.signatura}`
            }
            alt={selectedPhoto.naziv}
            width="1000px"
          />
          <div>
            {selectedPhoto.naziv}, {selectedPhoto.opis},{' '}
            {selectedPhoto.lokacija}, {selectedPhoto.latitude},{' '}
            {selectedPhoto.longitude}
          </div>
        </div>
      )}
      {/* Render the list of photos if needed */}
      {photos.map(photo => (
        <img
          key={photo.id}
          src={
            process.env.REACT_APP_SERVER_PUB + `/${photo.signatura}`
          }
          alt={photo.naziv}
        />
      ))}
    </div>
  );
}

export default Gallery;
