import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Masonry from 'react-masonry-css';

const getFiltersFromPhotos = photos => {
  if (!photos?.length) {
    return [];
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
};

export default function PhotosEDIT({ onRemove }) {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const [selectedId, setSelectedId] = useState(undefined);

  const selectedPhotoData = useMemo(() => {
    if (!photos?.length || !selectedId) {
      return undefined;
    }
    return photos.find(photo => photo.id === selectedId);
  }, [photos, selectedId]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const filters = useMemo(() => {
    return getFiltersFromPhotos(photos);
  }, [photos]);

  //
  const filteredPhotos = useSelector(state =>
    selectFilteredPhotos(state, selectedFilters)
  );

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
  };

  const [isRemoving, setIsRemoving] = useState(false);
  const handleRemove = async photo => {
    const photoLabel = `id: ${photo.id}${
      photo.signatura ? ` (${photo.signatura})` : ''
    }`;
    if (window.confirm(`Izbrisati ${photoLabel}?`)) {
      setIsRemoving(true);
      const isRemoved = await onRemove(photo);
      if (isRemoved) {
        setSelectedId(undefined);
      }
      setIsRemoving(false);
    }
  };

  // Get photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);
  //
  const breakpoints = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1,
  };
  //
  const photosPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;

  // Slice the photos array for the current page
  const photosToDisplay = filteredPhotos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };
  //

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
          closeModal={() => setSelectedId(undefined)}
          thumbnailUrl={
            selectedPhotoData
              ? `${process.env.REACT_APP_SERVER_PUB}/thumbs/${selectedPhotoData.signatura}`
              : undefined
          }
          signatura={
            selectedPhotoData
              ? selectedPhotoData.signatura
              : undefined
          }
        >
          {selectedPhotoData ? (
            <>
              {/* {selectedPhotoData.signatura && (
                <img
                 src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhotoData.signatura}`}
                 alt={selectedPhotoData.naziv}
                />
              )} */}
              <p style={{ color: 'white' }}>
                Signatura: {selectedPhotoData.signatura}
                <br />
                id: {selectedPhotoData.id}
              </p>
              {typeof onRemove === 'function' && (
                <button
                  type="button"
                  disabled={isRemoving}
                  onClick={() => handleRemove(selectedPhotoData)}
                >
                  {isRemoving ? 'Brisanje...' : 'IZBRIŠI'}
                </button>
              )}
              <FormNOVI uploadedFile={selectedPhotoData} />
            </>
          ) : (
            <p style={{ color: 'white' }}>
              Photo with id <strong>{selectedId}</strong> not found!
            </p>
          )}
        </Modal>
        {/* Masonry */}
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photosToDisplay.map((photo, index) => (
            <div
              key={photo.id}
              className={`photo ${
                photo.id === selectedId ? 'selected' : ''
              }`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                minHeight: 60,
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedId(photo.id)}
            >
              <div>{photo.signatura}</div>
              {photo.id === selectedId && (
                <div className="selected-div1">
                  <p>{photo.naziv}</p>
                  <p>{photo.tagovi}</p>
                  <p>{photo.kategorija}</p>
                  <p>{photo.opis}</p>
                  <p>{photo.signatura}</p>
                </div>
              )}
              {photo.signatura ? (
                <img
                  src={`${process.env.REACT_APP_SERVER_PUB}/thumbs/${photo.signatura}`}
                  alt={photo.naziv || photo.signatura}
                />
              ) : (
                <span>id: {photo.id}</span>
              )}
            </div>
          ))}
        </Masonry>
      </div>{' '}
      {/* Pagination controls */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Prethodna
          </button>
        )}
        {photosToDisplay.length === photosPerPage && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Sljedeća{' '}
          </button>
        )}
      </div>
    </div>
  );
}
