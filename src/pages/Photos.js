import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
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
import './photos.css';
import Selekt from '../comps/Selekt';
import ModalPhoto from './ModalPhoto';
import { setSelectedPhoto } from '../redux/rtk/mapSlice'; //

//
export default function Photos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Construct the URL with selectedPhotoIndex
  // const photoUrl = `/Photo?selectedPhotoIndex=${selectedPhotoIndex}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Define a function to open the modal
  const openModal = index => {
    setCurrentPhotoIndex(index);
    console.log('index', index);
    console.log('current', currentPhotoIndex);
    setIsModalOpen(true);
  };

  // Define a function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // arrays to Sets
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
  // console.log('Index:', index);
  console.log('potos', photos);

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

  // // Handle onClick
  // const handlePhotoClick = index => {
  //   dispatch(setSelectedPhotoIndex(index));
  //   dispatch(setSelectedPhoto(filteredPhotos[index]));
  //   setCardVisible(true);
  // };
  // Reset all photo sizes

  // Get photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //send it to show on map
  const handleShowOnMapClick = photo => {
    dispatch(setSelectedPhoto(photo)); // Dispatch the action with the selected photo
    // You can also navigate to the map view or update the map's state here if needed.
    navigate(`/mapa/${photo.signatura}`);
  };

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
            className="photo"
            // className={`photo ${
            //   selectedPhotoIndex === index ? 'selected' : ''
            // }`}
          >
            {index && (
              <div className="selected-div1">
                {/* <button onClick={handlePreviousPhoto}>prev</button> */}
                <p>{photo.naziv}</p>
                <p>{photo.tagovi}</p>
                <p>{photo.kategorija}</p>
                <p>{photo.opis}</p>
                <p>{photo.signatura}</p>
              </div>
            )}
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              onClick={() => openModal(index)}
            />
            <ModalPhoto
              isOpen={isModalOpen}
              closeModal={closeModal}
              thumbnailUrl={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              } // Pass the URL of the image
              signatura={signatura} // Pass the alt text
              currentPhotoIndex={currentPhotoIndex}
              setCurrentPhotoIndex={setCurrentPhotoIndex}
              filteredPhotos={filteredPhotos}
            >
              {/* Optionally, you can add content inside the modal */}
              <div>
                <div className="selected-div2"></div>
              </div>
            </ModalPhoto>
            {index && (
              <div>
                {/* <Link to="">Pokaži na karti</Link> */}
                {/* {photos.map(photo => (
                  <div key={photo.id}>
                    <img src={photo.url} alt={photo.name} />
                    <Link to={`/map/${photo.id}`}>Show on Map</Link>
                  </div>
                ))}
                {photos.map(photo => (
                  <div key={photo.id}>
                    <img src={photo.url} alt={photo.name} />
                    <button
                      onClick={() => handleShowOnMapClick(photo)}
                    >
                      Show on Map
                    </button>
                  </div>
                ))} */}
              </div>
            )}{' '}
          </div>
        ))}
      </div>
    </div>
  );
}
