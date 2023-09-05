import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectSelectedPhotoIndex,
  setFilters,
  selectFilteredPhotos,
} from '../redux/rtk/gallerySlice';
import './photos.css';
import Selekt from '../comps/Selekt';

//
export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]); //

  //console.log(photos);

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
  const filters = [
    { label: 'Tagovi', options: tagoviOptions },
    { label: 'KATEGORIJE', options: kategorijeOptions },
  ];
  console.log(filters);

  console.log('TAGpoTAG', tagoviSet, tagoviOptions);
  //
  const filteredPhotos = useSelector(state =>
    selectFilteredPhotos(state, selectedFilters)
  );

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
  };

  // Handle onClick
  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    setCardVisible(true);

    // Reset all photo sizes
    const photoElements = document.querySelectorAll('.photo');
    photoElements.forEach((element, idx) => {
      element.style.width = '170px';
      element.style.height = '140px';
    });

    // Adjust the size of the selected photo
    const selectedPhoto = photoElements[index];
    selectedPhoto.style.width = '88vw';
    selectedPhoto.style.height = 'auto';

    // Scroll the selected photo into view
    selectedPhoto.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  // Get photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="gallery">
      <div className="photo-filters">
        {/* filter options */}
        <Selekt
          filters={filters}
          selectedOptions={selectedFilters}
          onChange={handleFilterChange}
        />
      </div>
      <div className="photo-container">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`photo ${
              selectedPhotoIndex === index ? 'selected' : ''
            }`}
          >
            {selectedPhotoIndex === index && (
              <div className="selected-div1">
                <p>{photo.naziv}</p>
                <p>{photo.tagovi}</p>
                <p>{photo.kategorija}</p>
                <p>{photo.opis}</p>
                <p>{photo.autor}</p>
              </div>
            )}
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              onClick={() => handlePhotoClick(index)}
            />
            {selectedPhotoIndex === index && (
              <div className="selected-div2">
                {/* <Link to="">Pokaži na karti</Link> */}
              </div>
            )}{' '}
          </div>
        ))}
      </div>
    </div>
  );
}
