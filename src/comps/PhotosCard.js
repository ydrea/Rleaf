import React from 'react';
import { useSelector } from 'react-redux';
import { selectPhotos } from '../redux/rtk/gallerySlice';

export const PhotosCard = ({ idx, id }) => {
  //
  const photos = useSelector(selectPhotos);
  console.log(photos);
  const photo = photos.find(i => i.id === idx);
  ////
  return (
    <div className="slider">
      <div className="slide">
        &#10092;
        {JSON.stringify(photos)}
        <img
          src={
            // process.env.REACT_APP_SERVER_PUB +
            `http://localhost:3500/photos/${id}`
          }
          width="1000"
        />{' '}
        &#10093;
      </div>
      <div className="exif">exif</div>
    </div>
  );
};
