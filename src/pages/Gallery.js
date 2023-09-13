import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPhotos,
  selectPhotos,
  selectSelectedPhotoIndex,
  setSelectedPhotoIndex,
} from '../redux/rtk/gallerySlice';
import { Link, useParams } from 'react-router-dom';

//
export default function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const { signatura } = useParams();

  console.log('selectedPhotoIndex:', selectedPhotoIndex);

  // Fetch photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  useEffect(() => {
    // Find the index of the photo with matching 'signatura'
    const index = photos.findIndex(
      photo => photo.signatura === signatura
    );
    if (index !== -1) {
      dispatch(setSelectedPhotoIndex(index));
    }
  }, [dispatch, photos, signatura]);

  const handleThumbnailClick = index => {
    dispatch(setSelectedPhotoIndex(index));
  };

  return (
    <div className="gallery">
      <div className="thumbnails">

        //
        </div>
{photos.map((photo, index) => (
  <div key={photo.signatura}>
    <Link to={`/photo/${photo.signatura}?index=${index}`} target="_blank">
      <img src={photo.imageUrl} alt={photo.signatura} />
    </Link>
  </div>
))}
            <img
              src={`${process.env.REACT_APP_SERVER_PUB}/${photo.signatura}`}
              alt={photo.naziv}
              width="200px"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
