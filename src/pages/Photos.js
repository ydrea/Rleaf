import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
import KategorijeSelekt from '../comps/SelektK'; // Update import path
import TagoviSelekt from '../comps/SelektT'; // Update import path
import Hline from '../comps/Line';

//
const removeFileExtension = fileName => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return fileName; // No file extension found
  }
  return fileName.substring(0, lastDotIndex);
};
//

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

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
  };

  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    showPhotoSet(true);
    navigate(`/photos/${photos[index].signatura}`);
  };

  return (
    <div className="gallery">
      {/* filter options */}
      <div className="filters-container">
        <div className="select-container">
          <KategorijeSelekt
            photos={photos} // Pass photos data to KategorijeSelekt
          />
          <TagoviSelekt
            photos={photos} // Pass photos data to TagoviSelekt
          />
        </div>
      </div>
      <Hline color="#18aa00" height="2px" width="100%" />
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
      <Hline color="#7e7e77" height="2px" width="100%" />
    </div>
  );
}
