import { Login } from './Login';
import y from './gallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getPhotos,
  increment,
  decrement,
  selectPhotos,
  selectidX,
} from '../redux/rtk/gallerySlice';
import GalleryCard from '../comps/GalleryCard';
//
export function Gallery() {
  //
  const dispatch = useDispatch();
  const fotos = useSelector(selectPhotos);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === fotos.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? fotos.length - 1 : slide - 1);
  }; //minus
  const ajNazad = () => {
    dispatch(decrement());
  };
  //plus
  const ajNapred = () => {
    dispatch(increment());
  };
  //
  const images = fotos.map((i, index) => (
    <div className={y.slider}>
      <p
        style={{ fontSize: 40, cursor: 'crosshair' }}
        onClick={prevSlide}
      >
        &#10092;
      </p>
      <img
        className={y.slide}
        key={i.index}
        src={process.env.REACT_APP_SERVER_PUB + `/${i.signatura}`}
        width="1000"
      />
      <div className={y.exif}>
        <div style={{ fontSize: 50, cursor: 'crosshair' }}>
          {index}
        </div>
        {i.naziv}, {i.opis}, {i.lokacija}
      </div>
      <p style={{ fontSize: 40 }} onClick={nextSlide}>
        &#10093;
      </p>
    </div>
  ));

  useEffect(() => {
    dispatch(getPhotos());
    console.log(fotos);
    // listPhotos();
  }, [dispatch]);
  //

  return (
    <div className={y.g}>
      {fotos.map((i, idx) => {
        return (
          <div className={slide === idx ? y.slider : y.hid}>
            <p
              style={{ fontSize: 40, cursor: 'crosshair' }}
              onClick={prevSlide}
            >
              &#10092;
            </p>
            <img
              className={y.slide}
              key={idx}
              src={
                process.env.REACT_APP_SERVER_PUB + `/${i.signatura}`
              }
            />
            <div className={y.exif}>
              <div style={{ fontSize: 50, cursor: 'crosshair' }}>
                {idx}
              </div>
              {i.naziv}, {i.opis}, {i.lokacija}
            </div>
            <p
              style={{ fontSize: 40, cursor: 'crosshair' }}
              onClick={nextSlide}
            >
              &#10093;
            </p>
          </div>
        );
      })}
      <GalleryCard />
      <Login />
    </div>
  );
}
