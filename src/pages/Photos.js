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
import KategorijeSelekt from '../comps/SelektK';
import TagoviSelekt from '../comps/SelektT';

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
  //

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  //filtri
  const tagoviSet = new Set();
  const kategorijeSet = new Set();

  photos.forEach(photo => {
    const tagoviArray = photo.tagovi.split(',');

    tagoviArray.forEach(tag => {
      tagoviSet.add(tag.trim());
    });

    kategorijeSet.add(photo.kategorija);
  });

  const tagoviOptions = Array.from(tagoviSet).map(tag => ({
    value: tag,
    label: tag,
  }));

  const kategorijeOptions = Array.from(kategorijeSet).map(
    kategorija => ({
      value: kategorija,
      label: kategorija,
    })
  );

  const filters = [
    { label: 'Tagovi', options: tagoviOptions },
    { label: 'KATEGORIJE', options: kategorijeOptions },
  ];

  console.log(filteredPhotos);

  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
  };

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
      <div className="filters-container">
        <div className="select-container">
          <KategorijeSelekt
            kategorijeOptions={kategorijeOptions}
            className="select"
          />
          <TagoviSelekt
            tagoviOptions={tagoviOptions}
            className="select"
          />
        </div>
        <div className="line-div2" />
      </div>

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
