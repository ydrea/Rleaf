import { Login } from './Login';
import y from './gallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getPhotos,
  selectPhotos,
  // increment,
  // decrement,
} from '../redux/rtk/gallerySlice';
import exifr from 'exifr';
import imago from '../assets/BAN-001/BAN-001-27.jpg';
//
export function Gallery() {
  const getExif = async () => {
    const exIf = await exifr.gps(imago);
    console.log(exIf);
  };
  //
  useEffect(() => {
    console.log(imago);
    getExif();
  }, []);
  //
  const dispatch = useDispatch();
  const fotos = useSelector(selectPhotos);
  //
  useEffect(() => {
    dispatch(getPhotos());
    console.log(fotos);
  }, [dispatch]);
  //
  return (
    <div className={y.g}>
      <div>
        Gallery <img src="" alt="foto" />
      </div>
      <div>
        {fotos.map(i => (
          <img key={i.id} src={i.download_url} width="333" />
        ))}
      </div>
      <Login />
    </div>
  );
}
