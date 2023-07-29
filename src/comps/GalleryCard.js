import React from 'react';

const GalleryCard = props => {
  // const {image}=
  //
  return (
    <div className="slider">
      <div className="slide">
        &#10092;{' '}
        <img
          src={process.env.REACT_APP_SERVER_PUB + `/${i.naziv}`}
          width="1000"
        />{' '}
        &#10093;
      </div>
      <div className="exif">exif</div>
    </div>
  );
};

export default GalleryCard;
