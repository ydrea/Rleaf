import './photo.css';
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/rtk/gallerySlice';
//
export function Photo({ photo }) {
  const dispatch = useDispatch();

  return (
    <div className="cont">
      <div className="image-wrapper">
        <button
          className="prev"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          prev
        </button>
        <div>
          <img
            style={{ maxWidth: '90vw' }}
            src={`${process.env.REACT_APP_SERVER_PUB}/${photo.signatura}`}
            alt={photo.naziv}
          />
          <div>
            {photo.naziv}, {photo.opis}, {photo.geom},{' '}
          </div>
        </div>
        <button
          className="next"
          onClick={() => {
            dispatch(increment());
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}
