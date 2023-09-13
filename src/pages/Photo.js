import { useSelector, useDispatch } from 'react-redux';
import {
  selectPhotos,
  selectSelectedPhoto,
  selectSelectedPhotoIndex,
  getPhotos,
  setSelectedPhotoIndex,
  selectedPhotoIndex,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

import './photo.css';

export default function Photo() {
  const photos = useSelector(selectPhotos);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const dispatch = useDispatch();

  const selectedPhoto = useSelector(selectSelectedPhoto);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  console.log(selectedPhoto);

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
            style={{ maxWidth: '90vw' }}
            src={
              selectedPhoto
                ? `${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`
                : ``
            }
            // alt={signatura}
          />
          <div>Txt</div>
        </div>
        {/* <button className="center">Show on Map</button> */}

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
