import { Login } from './Login';
import y from './gallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
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
  const idX = fotos.map(i => {
    return i.id;
  });
  console.log(idX);
  //minus
  const ajNazad = () => {
    dispatch(decrement(idX));
  };
  //plus
  const ajNapred = () => {
    dispatch(increment(idX));
  };
  //
  const images = fotos.map((i, index) => (
    <div className={y.slider}>
      <p style={{ fontSize: 40 }} onClick={ajNazad}>
        &#10092;
      </p>
      <img
        className={y.slide}
        key={i.id}
        src={process.env.REACT_APP_SERVER_PUB + `/${i.signatura}`}
        width="1000"
      />
      <div className={y.exif}>
        {i.naziv}, {i.opis}, {i.lokacija}
      </div>
      <p style={{ fontSize: 40 }} onClick={ajNapred}>
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
      {images[3]}
      <GalleryCard idX={idX} />
      <Login />
    </div>
  );
}
