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

  // Define filters here
  const filters = [
    { value: 'tag1', label: 'Tag 1' },
    { value: 'tag2', label: 'Tag 2' },
    { value: 'tag3', label: 'Tag 3' },
    // Add more filter options as needed
  ];
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
      <div className="photo-filters">
        {/* filter options */}
        <Selekt
          selectedOptions={selectedFilters}
          onChange={handleFilterChange}
          filters={filters}
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
