import { Login } from './Login';
import y from './gallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPhotos, selectPhotos } from '../redux/rtk/gallerySlice';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

//
export function Gallery() {
  //
  const dispatch = useDispatch();
  const fotos = useSelector(selectPhotos);
  //
  const images = fotos.map(i => (
    <img
      key={i.id}
      src={`http://localhost:3500/public/${i.naziv}`}
      width="333"
    />
  ));
  useEffect(() => {
    dispatch(getPhotos());
    console.log(fotos);
    // listPhotos();
  }, [dispatch]);
  //
  return (
    <div className={y.g}>
      {images}
      <Login />
    </div>
  );
}
