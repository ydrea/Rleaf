// import React from 'react';
import { Outlet } from 'react-router-dom';
import Selekt from './comps/Selekt';
import KategorijeSelekt from './comps/SelektK';
import TagoviSelekt from './comps/SelektT';
import { useEffect, useState } from 'react';
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
} from './redux/rtk/gallerySlice';
import './pages/photos.css';
import Photo from './pages/Photo';
import Footer from './comps/Footer';

//
const PhotosLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showPhoto, showPhotoSet] = useState(false);
  //

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //filtri
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

  console.log(filteredPhotos);

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
  };

  //
  return (
    <div>
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />{' '}
        <p>
          Dobrodošli u medijateku "Opservatorija krajobraza". Naša
          kolekcija čuva slikovne priče krajobraza, dokumentirajući ih
          kroz različite teme, projekte i vremenske okvire. Svaka
          slika je pažljivo odabrana, opremljena detaljnim
          informacijama i, gdje je to moguće, preciznim geografskim
          koordinatama.
        </p>
        <div className="line-div1" />{' '}
      </div>{' '}
      <div className="filters-container">
        {/* <Selekt
          filters={filters}
          selectedOptions={selectedFilters}
          onChange={handleFilterChange}
        /> */}
        <div className="select-container">
          <KategorijeSelekt
            kategorijeOptions={kategorijeOptions}
            className="select"
          />
          <TagoviSelekt
            tagoviOptions={tagoviOptions}
            className="select"
          />
        </div>
        <div className="line-div2" />
      </div>
      <Outlet filteredPhotos={filteredPhotos} />{' '}
      {/* This will render child routes */}
      <Footer />
    </div>
  );
};

export default PhotosLayout;
