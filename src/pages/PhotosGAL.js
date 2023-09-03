import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectSelectedPhotoIndex,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';
import './photos.css';

export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [cardVisible, setCardVisible] = useState(false);

  // Handle onClick
  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    setCardVisible(true);

    // Adjust photo sizes
    const photoElements = document.querySelectorAll('.photo');
    photoElements.forEach((element, idx) => {
      if (idx === index) {
        element.style.width = '80vw'; // Adjust to the width of your Card component
        element.style.height = 'auto'; // Maintain aspect ratio
      } else {
        element.style.width = '200px'; // Adjust to the original width of other photos
        element.style.height = '150px'; // Adjust to the original height of other photos
      }
    });
  };

  // Get photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="gallery">
      <div className="photo-container">
        {photos.map((photo, index) => (
          <div key={photo.id} className="photo">
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              onClick={() => handlePhotoClick(index)}
            />
          </div>
        ))}
      </div>
      {/* {cardVisible && selectedPhotoIndex !== null && (
        <Card photo={photos[selectedPhotoIndex]} className="card" />
      )} */}
    </div>
  );
}
