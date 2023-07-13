// import React from 'react';
import y from './gallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getPhotos,
  selectPhotos,
  // increment,
  // decrement,
} from '../redux/rtk/gallerySlice';
//
export function Gallery() {
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
      {/* {JSON.stringify(fotos)} */}
    </div>
  );
}
