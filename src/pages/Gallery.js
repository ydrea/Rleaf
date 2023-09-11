import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useHistory from react-router
import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectSelectedPhotoIndex,
  setFilters,
  selectFilteredPhotos,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import { Card } from '../comps/Card';

export default function Photos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); //

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
  // photoElements.forEach((element, elementidx) => {
  //   element.style.width = '170px';
  //   element.style.height = '140px';
  // });

  // Adjust the size of the selected photo
  const selectedPhoto = photoElements[selectedPhotoIndex];

  // prev
  const handleNextPhoto = () => {
    dispatch(increment());
  };
  //next
  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };
  //showOnMap
  const handleShowOnMap = () => {
    console.log('ajd');
    if (selectedPhoto && selectedPhoto.popUp) {
      navigate(`/mapa/${selectedPhoto.popUp}`);
    }
  };

  return (
    <div className="gallery">
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
          <Link
            to={`/photos/${photo.signatura}`}
            key={photo.id}
            target="_blank"
          >
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              style={{ width: '200px' }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
