import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import Form from '../comps/Form';
import { setSelectedPhoto } from '../redux/rtk/mapSlice'; //
import Modal from '../comps/Modal';
//
export default function PhotosEDIT() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { popUp, signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedPhotoForEdit, setSelectedPhotoForEdit] =
    useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [exifRForEdit, setExifRForEdit] = useState();
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

  //
  const selectedPhoto = selectedPhotoForEdit;
  const thumbnailUrl =
    process.env.REACT_APP_SERVER_PUB + `/${selectedPhoto?.signatura}`;
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

  // Handle onClick to open the modal
  const handlePhotoClick = (index, exifR) => {
    dispatch(setSelectedPhotoIndex(index));
    setSelectedPhotoForEdit(filteredPhotos[index]);
    setExifRForEdit(exifR);
    setIsModalOpen(true);
  };
  // Get photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="gallery">
      <div className="photo-filters">
        <Selekt
          filters={filters}
          selectedOptions={selectedFilters}
          onChange={handleFilterChange}
        />
      </div>
      <div className="photo-container">
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        >
          {/* Pass the 'signatura' and thumbnail URL to the Modal */}
          <img src={thumbnailUrl} alt={selectedPhoto?.naziv} />
          <p>Signatura: {selectedPhoto?.signatura}</p>
          {/* Pass your Form component or other content here */}
          <Form
            uploadedFile={selectedPhotoForEdit}
            exifR={exifRForEdit}
          />
        </Modal>
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`photo ${
              selectedPhotoIndex === index ? 'selected' : ''
            }`}
            onClick={() => handlePhotoClick(index, photo.exifR)}
          >
            {selectedPhotoIndex === index && (
              <div className="selected-div1">
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
