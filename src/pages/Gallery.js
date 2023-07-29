import { Login } from './Login';
import y from './gallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getPhotos,
  selectPhotos,
  selectidX,
} from '../redux/rtk/gallerySlice';
// import ReactImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';

//
export function Gallery() {
  //
  const dispatch = useDispatch();
  const fotos = useSelector(selectPhotos);

  const idX = useSelector(selectidX);
  //
  const images = fotos.map((i, index) => (
    <div className={y.slider}>
      <p style={{ fontSize: 40 }}>&#10092;</p>
      <img
        className={y.slide}
        key={i.id}
        src={process.env.REACT_APP_SERVER_PUB + `/${i.naziv}`}
        width="1000"
      />
      <div className={y.exif} key={i.id}>
        {i.naziv}, {i.opis}, {i.lokacija}
      </div>
      <p style={{ fontSize: 40 }}>&#10093;</p>
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
      {images[1]}
      <Login />
    </div>
  );
}
