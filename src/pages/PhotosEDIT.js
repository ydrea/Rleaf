import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPhotos,
  selectPhotos,
  setFilters,
  selectFilteredPhotos,
} from '../redux/rtk/gallerySlice';
import './photos.css';
import Selekt from '../comps/Selekt';
import FormNOVI from '../comps/FormNOVI';
import Modal from '../comps/Modal';

const getFiltersFromPhotos = (photos) => {
  if (!photos?.length) {
    return []
  }
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
  return [
    { label: 'Tagovi', options: tagoviOptions },
    { label: 'KATEGORIJE', options: kategorijeOptions },
  ];
}

export default function PhotosEDIT() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { id } = useParams()
  const selectedId = parseInt(id || '', 10) || undefined

  const selectedPhotoData = useMemo(() => {
    if (!photos?.length || !selectedId) {
      return undefined
    }
    return photos.find((photo) => photo.id === selectedId)
  }, [photos, selectedId]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const filters = useMemo(() => {
    return getFiltersFromPhotos(photos)
  }, [photos])

  //
  const filteredPhotos = useSelector(state =>
    selectFilteredPhotos(state, selectedFilters)
  );

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
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
          isOpen={!!selectedId}
          closeModal={() => navigate('/edit')}
          thumbnailUrl={selectedPhotoData ? `${process.env.REACT_APP_SERVER_PUB}/${selectedPhotoData.signatura}` : undefined}
          signatura={selectedPhotoData ? selectedPhotoData.signatura : undefined}
        >
          {selectedPhotoData ? (
            <>
              {selectedPhotoData.signatura && (
                <img
                 src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhotoData.signatura}`}
                 alt={selectedPhotoData.naziv}
                />
              )}
              <p>Signatura: {selectedPhotoData.signatura}</p>
              <p>id: {selectedPhotoData.id}</p>
              <FormNOVI
                uploadedFile={selectedPhotoData}
              />
            </>
          ) : (
            <p style={{
              color: 'white'
            }}>
              Photo with id <strong>{selectedId}</strong> not found!
            </p>
          )}
        </Modal>

        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`photo ${
              photo.id === selectedId ? 'selected' : ''
            }`}
            onClick={() => navigate(`/edit/${photo.id}`)}
          >
            {photo.id === selectedId && (
              <div className="selected-div1">
                <p>{photo.naziv}</p>
                <p>{photo.tagovi}</p>
                <p>{photo.kategorija}</p>
                <p>{photo.opis}</p>
                <p>{photo.signatura}</p>
              </div>
            )}
            {photo.signatura && (
              <img
                src={`${process.env.REACT_APP_SERVER_PUB}/${photo.signatura}`}
                alt={photo.naziv}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
