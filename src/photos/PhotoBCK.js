import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/rtk/gallerySlice';
// import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {
  getPhotos,
  selectPhotos,
  selectSelectedPhotoIndex,
  setSelectedPhotoIndex,
  selectedPhotoIndex,
} from '../redux/rtk/gallerySlice';
import './photo.css';

//
export default function Photo() {
  const dispatch = useDispatch();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const photos = useSelector(selectPhotos);

  const { search } = useLocation();
  const queryParams = queryString.parse(search);
  const { signatura } = useParams();

  const [sig, sigSet] = useState('');

  const index = queryParams.index || 0;
  const imageUrl = `${process.env.REACT_APP_SERVER}/public/${signatura}?index=${index}`;

  // console.log('selectedPhotoIndex:', indeX);
  // //showOnMap
  // const handleShowOnMap = () => {
  //   console.log('ajd');
  //   if (selectedPhoto) {
  //     navigate(`/mapa/${signatura}`);
  //   }
  // };
  useEffect(() => {
    sigSet(signatura);
    dispatch(getPhotos());
  }, []);

  //

  // Ensure that the selectedPhotoIndex is within bounds
  if (selectedPhotoIndex < 0) {
    dispatch(setSelectedPhotoIndex(0));
  } else if (selectedPhotoIndex >= photos.length) {
    dispatch(setSelectedPhotoIndex(photos.length - 1));
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
            style={{ maxWidth: '90vw' }}
            src={imageUrl}
            alt={signatura}
          />
          {/* <div>Txt</div> */}
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
