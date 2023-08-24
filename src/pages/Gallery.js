import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useHistory from react-router
import {
  getPhotos,
  increment,
  decrement,
  selectPhotos,
  selectPhotoIndex,
  selectSelectedPhotoIndex,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';

export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];
  const { popUp, signatura } = useParams();
  const navigate = useNavigate();
  //
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  useEffect(() => {
    const index = photos.findIndex(
      photo => photo.popUp === popUp || photo.signatura === signatura
    );
    if (index !== -1) {
      dispatch(selectPhotoIndex(index));
    }
  }, [dispatch, photos, popUp, signatura]);

  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  const handleShowOnMap = () => {
    console.log('ajd');
    if (selectedPhoto && selectedPhoto.popUp) {
      navigate(`/mapa/${selectedPhoto.popUp}`);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
      {selectedPhoto && (
        <Card
          photo={selectedPhoto}
          popUp={popUp}
          signatura={signatura}
        />
      )}
      {selectedPhoto && (
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
          <button onClick={handleShowOnMap}>Show on Map</button>
        </div>
      )}
      <div>
        {photos.map(photo => (
          <Link to={`/gallery/${photo.signatura}`} key={photo.id}>
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              style={{ width: '400px' }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
