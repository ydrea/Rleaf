import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos, selectPhotos } from '../redux/rtk/gallerySlice';
import { GalleryCard } from '../comps/GalleryCard';
import { useParams } from 'react-router-dom';
import y from './gallery.module.scss';

export function ImagePage() {
  const dispatch = useDispatch();
  const fotos = useSelector(selectPhotos);
  const [slide, setSlide] = useState(0);

  const [image, setImage] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    // Fetch data for the specific image using the provided backend route
    fetch(`/photos/${id}`)
      .then(response => response.json())
      .then(data => {
        setImage(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const nextSlide = () => {
    setSlide(slide => (slide === fotos.length - 1 ? 0 : slide + 1));
  };

  const prevSlide = () => {
    setSlide(slide => (slide === 0 ? fotos.length - 1 : slide - 1));
  };

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <div className={y.g}>
      <div>
        {image && (
          <div className={y.slider}>
            {/* Render the image and details here */}
            <img
              className={y.slide}
              src={
                process.env.REACT_APP_SERVER_PUB +
                `/${image.signatura}`
              }
              alt={image.naziv}
            />
            <div className={y.exif}>
              {image.naziv}, {image.opis}, {image.lokacija},{' '}
              {image.latitude}, {image.longitude}
            </div>
          </div>
        )}
      </div>

      {fotos.map((i, idx) => (
        <div className={slide === idx ? y.slider : y.hid} key={idx}>
          <p
            style={{ fontSize: 40, cursor: 'crosshair' }}
            onClick={prevSlide}
          >
            &#10092;
          </p>
          <img
            className={y.slide}
            src={process.env.REACT_APP_SERVER_PUB + `/${i.signatura}`}
            alt={i.naziv}
          />
          <div className={y.exif}>
            <div style={{ fontSize: 50, cursor: 'crosshair' }}>
              {idx}
            </div>
            {i.naziv}, {i.opis}, {i.lokacija}, {i.latitude},{' '}
            {i.longitude}
          </div>
          <GalleryCard idx={idx} id={id} />
          <p
            style={{ fontSize: 40, cursor: 'crosshair' }}
            onClick={nextSlide}
          >
            &#10093;
          </p>
        </div>
      ))}
    </div>
  );
}
