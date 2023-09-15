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
import KategorijeSelekt from '../comps/SelektK';
import TagoviSelekt from '../comps/SelektT';

export default function Photos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const filters = [
    { label: 'Tagovi', options: tagoviOptions },
    { label: 'KATEGORIJE', options: kategorijeOptions },
  ];

  const filteredPhotos = useSelector(state =>
    selectFilteredPhotos(state, selectedFilters)
  );

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
  };

  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    navigate(`/photo/${photos[index].signatura}`); // Navigate to the individual photo route
  };

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className="gallery">
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <p>
          Dobrodošli u medijateku "Opservatorija krajobraza". Naša
          kolekcija čuva slikovne priče krajobraza, dokumentirajući ih
          kroz različite teme, projekte i vremenske okvire. Svaka
          slika je pažljivo odabrana, opremljena detaljnim
          informacijama i, gdje je to moguće, preciznim geografskim
          koordinatama.
        </p>
      </div>

      <div className="filters-container">
        {/* filter options */}
        <Selekt
          filters={filters}
          selectedOptions={selectedFilters}
          onChange={handleFilterChange}
        />
        <KategorijeSelekt kategorijeOptions={kategorijeOptions} />
        <TagoviSelekt tagoviOptions={tagoviOptions} />
      </div>
      <div className="photo-container">
        {filteredPhotos.map((photo, index) => (
          <div key={photo.id} className="photo">
            {index && (
              <div className="selected-div2">{photo.signatura}</div>
            )}
            <img
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${photo.signatura}`
              }
              alt={photo.naziv}
              onClick={() => handlePhotoClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
