import './photo.css';
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/rtk/gallerySlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
export function Photo({ selectedPhoto, signatura }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //showOnMap
  const handleShowOnMap = () => {
    console.log('ajd');
    if (selectedPhoto) {
      navigate(`/mapa/${signatura}`);
    }
  };
  return (
    <div className="cont">
      <div className="image-wrapper">
        <FontAwesomeIcon
          className="prev"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          prev
        </FontAwesomeIcon>
        <div>
          <img
            style={{ maxWidth: '90vw' }}
            src={`${process.env.REACT_APP_SERVER_PUB}/${selectedPhoto.signatura}`}
            alt={selectedPhoto.naziv}
          />
          <div>
            {selectedPhoto.naziv}, {selectedPhoto.opis},{' '}
            {selectedPhoto.geom},{' '}
          </div>
        </div>
        {/* <FontAwesomeIcon
          icon={faChevronRight}
          className="center"
          onClick={handleShowOnMap}
        >
          Show on Map
        </FontAwesomeIcon> */}
        <FontAwesomeIcon
          className="next"
          onClick={() => {
            dispatch(increment());
          }}
        >
          next
        </FontAwesomeIcon>
      </div>
    </div>
  );
}
