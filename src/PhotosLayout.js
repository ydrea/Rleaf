// import React from 'react';
import { Outlet } from 'react-router-dom';
import Selekt from './comps/Selekt';
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
  const filteredPhotos = useSelector(state =>
    selectFilteredPhotos(state, selectedFilters)
  );
  //
  return (
    <div className="gallery">
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
      <Outlet filteredPhotos={filteredPhotos} />{' '}
      {/* This will render child routes */}
      <Footer />
    </div>
  );
};

export default PhotosLayout;
