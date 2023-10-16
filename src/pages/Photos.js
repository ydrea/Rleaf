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
import Hline from '../comps/Line';
import Masonry from 'react-masonry-css';

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

  //
  const handleFilterChange = selectedOptions => {
    setSelectedFilters(selectedOptions);
    dispatch(setFilters(selectedOptions));
    dispatch(selectFilteredPhotos(filteredPhotos));
  };

  const removeFileExtension = fileName => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName; //
    }
    return fileName.substring(0, lastDotIndex);
  };
  //
  const handlePhotoClick = index => {
    dispatch(setSelectedPhotoIndex(index));
    showPhotoSet(true);
    navigate(`/photos/${photos[index].signatura}`);
  };
  //
  const breakpoints = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1,
  };
  //
  const photosPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;

  // Slice the photos array for the current page
  const photosToDisplay = filteredPhotos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };
  //
  return (
    <div className="gallery">
      {/* filter options */}
      {/* <div className="filters-container"> */}
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
      {/* <div className="line-div2" /> */}
      <Hline color="#18aa00" height="2px" width="100%" />
      {/* Masonry */}
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photosToDisplay && photosToDisplay.length > 0 ? (
          photosToDisplay.map((photo, index) => (
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
      </Masonry>{' '}
      {/* Pagination controls */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Prethodna
          </button>
        )}
        {photosToDisplay.length === photosPerPage && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Sljedeća{' '}
          </button>
        )}
      </div>
      {/* </div> */}
      <Hline color="#7e7e77" height="2px" width="100%" />{' '}
    </div>
  );
}
