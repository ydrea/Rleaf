import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getPhotos,
  setSelectedPhotoIndex,
  selectPhotos,
  selectSelectedPhotoIndex,
  setFilters,
  selectFilteredPhotos,
  increment,
  decrement,
} from '../redux/rtk/gallerySlice';
import './photos.css';
import Photo from './Photo';

export default function Photos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const { signatura } = useParams();
  const selectedPhotoIndex = useSelector(selectSelectedPhotoIndex);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showPhoto, showPhotoSet] = useState(false);
  const filteredPhotos = useSelector(state =>
    selectFilteredPhotos(state, selectedFilters)
  );

  console.log(filteredPhotos);
  //
  const removeFileExtension = fileName => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName; // No file extension found
    }
    return fileName.substring(0, lastDotIndex);
  };
  //
  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    showPhotoSet(true);
    navigate(`/photos/${photos[index].signatura}`);
    // Navigate to the individual photo route
  };

  return (
    <div className="gallery">
      {/* filter options */}
      <div className="photo-container">
        {filteredPhotos && filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo, index) => (
            <div key={photo.id} className="photo">
              {index && (
                <div className="selected-div2">
                  {removeFileExtension(photo.signatura)}
                </div>
              )}
              <img
                src={
                  process.env.REACT_APP_SERVER_PUB +
                  `/${photo.signatura}`
                }
                alt={photo.naziv}
                onClick={() => handlePhotoClick(index)}
              />
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}
