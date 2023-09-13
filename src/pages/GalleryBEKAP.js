import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useHistory from react-router
import {
  getPhotos,
  selectPhotos,
  selectSelectedPhotoIndex,
  selectFilteredPhotos,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';
import GalleryElement from './GalleryElement';

export default function Photos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);

  //get em
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // Assuming photos is an array of photo objects
  const tagoviSet = new Set();
  const kategorijeSet = new Set();

  photos.forEach(photo => {
    const tagoviArray = photo.tagovi.split(',');

    tagoviArray.forEach(tag => {
      tagoviSet.add(tag.trim());
    });

    kategorijeSet.add(photo.kategorija);
  });

  const tagoviOptions = Array.from(tagoviSet).map(tag => ({
    value: tag,
    label: tag,
  }));

  const kategorijeOptions = Array.from(kategorijeSet).map(
    kategorija => ({
      value: kategorija,
      label: kategorija,
    })
  );
  //
  console.log('selectedPhotoIndex:', selectedPhotoIndex);
  console.log('photos:', photos);
  const photoElements = document.querySelectorAll('.photo');
  const selectedPhoto = photoElements[selectedPhotoIndex];

  // Render the GalleryElement component based on the URL parameter
  const renderGalleryElement = () => {
    if (signatura) {
      // If the "signatura" parameter exists, render the GalleryElement component
      return <GalleryElement signatura={signatura} />;
    } else {
      // Otherwise, render your existing gallery content
      return (
        <div className="gallery">
          {/* Your existing gallery content */}
          {/* <div>
            <button onClick={handlePreviousPhoto}>Previous Photo</button>
            <button onClick={handleNextPhoto}>Next Photo</button>
          </div> */}
          {selectedPhoto && (
            <Card
              photo={selectedPhoto}
              popUp={popUp}
              signatura={signatura}
            />
          )}
          {/* {selectedPhoto && (
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
          )} */}
          <div>
            {photos.map(photo => (
              <a
                href={`${process.env.REACT_APP_SERVER_PUB}/${photo.signatura}`}
                key={photo.id}
                target="_blank"
                rel="noopener noreferrer" //
              >
                <img
                  src={
                    process.env.REACT_APP_SERVER_PUB +
                    `/${photo.signatura}`
                  }
                  alt={photo.naziv}
                  style={{ width: '200px' }}
                />
              </a>
            ))}
          </div>
        </div>
      );
    }
  };

  return <div>{renderGalleryElement()}</div>;
}
