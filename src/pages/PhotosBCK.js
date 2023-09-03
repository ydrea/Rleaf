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
import { CSSTransition } from 'react-transition-group';

export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const navigate = useNavigate();

  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const selectedPhoto = photos[selectedPhotoIndex];
  const [cardVisible, cardVisibleSet] = useState(false);

  //handle onClick
  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    cardVisibleSet(true);
    console.log(cardVisible);
  };

  //get em all
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="gallery">
      {cardVisible && selectedPhoto !== null && (
        <CSSTransition
          in={cardVisible}
          timeout={200}
          classNames="card"
          unmountOnExit
        >
          <Card photo={selectedPhoto} className="card" />
        </CSSTransition>
      )}
      {/* Render the list of photos as links */}
      <div className="photo-container">
        {photos.map((photo, index) => (
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
                onClick={() => handlePhotoClick(index)}
              />
              <div
                className={`overlay ${
                  selectedPhoto === index && cardVisible
                    ? 'overlay-hidden'
                    : ''
                }`}
              ></div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />{' '}
    </div>
  );
}
