import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import {  } from 'react-router';
import {
  getPhotos,
  increment,
  decrement,
  selectPhotos,
  selectPhotoIndex,
  selectSelectedPhotoIndex,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card'; // Import your Card component
import './photos.scss';
import { MapContainer } from 'react-leaflet';

export default function Photos() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  // ... (existing code)
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  // const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];
  console.log(selectedPhoto);
  const { popUp, signatura } = useParams(); // Get both parameters from the URL
  const navigate = useNavigate(); //

  const handlePhotoClick = index => {
    setSelectedPhotoIndex(index); // Update selectedPhotoIndex
  };
  const handleShowOnMap = () => {
    if (selectedPhoto && selectedPhoto.signatura) {
      setShowMapPopup(true); // Open the map popup
      navigate(`/mapa/${selectedPhoto.signatura}`);
    }
  };
  //
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //find it
  useEffect(() => {
    console.log('PopUp:', popUp);
    console.log('Signatura:', signatura);

    const index = photos.findIndex(
      photo => photo.popUp === popUp || photo.signatura === signatura
    );
    console.log('Index:', index);

    if (index !== -1) {
      dispatch(selectPhotoIndex(index));
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
              onClick={() => handlePhotoClick(index)} // Call the new function
            />
          </Link>
        ))}
      </div>
      {selectedPhotoIndex !== null && (
        <Mapa selectedPhotoIndex={selectedPhotoIndex} />
      )}
    </div>
  );
}
