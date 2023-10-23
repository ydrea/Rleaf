import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPhotos,
  getPhotos,
  setSelectedPhotoIndex,
  selectSelectedPhotoIndex,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import { useParams, useNavigate } from 'react-router-dom';
import './photo.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  setSelectedMarker,
  selectSelectedPhoto,
} from '../redux/rtk/mapSlice';
//
export default function Photo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signatura } = useParams();

  const selectedImg = useSelector(selectSelectedPhoto);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // Retrieve the selected photo
  const photos = useSelector(selectPhotos);
  const selectedPhoto = photos[selectedPhotoIndex];

  if (!selectedPhoto) {
    return <div>Photo not found</div>;
  }

  const handleBackToGallery = () => {
    navigate('/photos');
  };

  //
  const handleShowOnMap = () => {
    // Dispatch an action to set the selected marker in Redux
    dispatch(setSelectedMarker(selectedImg.signatura));
    console.log(selectedImg.signatura);

    navigate(`/mapa/${signatura}`);
  };

  return (
    <div className="cont">
      <div className="filters-container">
        <div
          className="select-container"
          onClick={handleBackToGallery}
        >
          natrag u galeriju
        </div>
        <div className="select-container" onClick={handleShowOnMap}>
          pokaži na karti
        </div>
      </div>
      <div className="image-wrapper">
        <FaChevronLeft
          className="prev"
          onClick={() => {
            if (selectedPhotoIndex > 0) {
              dispatch(decrement());
            }
          }}
          disabled={selectedPhotoIndex === 0}
        />
        <div className="img-cnt">
          <img
            className="img-photo"
            src={
              selectedPhoto
                ? `${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`
                : ''
            }
            alt={selectedPhoto.naziv}
          />
          <div className="selected-div1">
            {selectedPhoto.signatura && (
              <>
                <div className="t">signatura:</div>
                <div className="d">{selectedPhoto.signatura}</div>
              </>
            )}
            {selectedPhoto.kategorija && (
              <>
                <div className="t">kategorija:</div>
                <div className="d">{selectedPhoto.kategorija}</div>
              </>
            )}{' '}
            {selectedPhoto.lokacija && (
              <>
                <div className="t">lokacija:</div>
                <div className="d">{selectedPhoto.lokacija}</div>
              </>
            )}
            {selectedPhoto.opis && (
              <>
                <div className="t">opis:</div>
                <div className="d">{selectedPhoto.opis}</div>
              </>
            )}
            {selectedPhoto.autor && (
              <>
                <div className="t">autor:</div>
                <div className="d">{selectedPhoto.autor}</div>
              </>
            )}
            {selectedPhoto.tagovi && (
              <div className="tag">
                {/* <div className="rep"> */}
                ključne riječi | {selectedPhoto.tagovi}
                {/* </div> */}
              </div>
            )}
          </div>
        </div>

        <FaChevronRight
          className="next"
          onClick={() => {
            if (selectedPhotoIndex < photos.length - 1) {
              dispatch(increment());
            }
          }}
          disabled={selectedPhotoIndex === photos.length - 1}
        />
      </div>
    </div>
  );
}
