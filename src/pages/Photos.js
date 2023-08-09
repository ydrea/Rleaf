// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';

// // import y from './gallery.module.scss';

// // // Assuming you have already set up your Redux and other imports
// // import {
// //   selectPhotos,
// //   selectAPhoto,
// // } from '../redux/rtk/gallerySlice';
// // import { useSelector } from 'react-redux';

// // export function PhotosPage() {
// //   const { id } = useParams();
// //   const [image, setImage] = useState([]);
// //   const selectedPhoto = useSelector(selectAPhoto);
// //   console.log(selectedPhoto);
// //   const selectedPhotos = useSelector(selectPhotos);
// //   console.log(selectedPhotos);
// //   useEffect(() => {
// //     //     // Fetch data for the specific image using the provided backend route
// //     //     fetch(`/photos/${id}`)
// //     //       .then(response => response.json())
// //     //       .then(data => {
// //     setImage(selectedPhoto);
// //     //       })
// //     //       .catch(error => {
// //     //         console.error(error);
// //     // });
// //   }, [id]);

// //   return (
// //     <div className={y.g}>
// //       {image && (
// //         <div className={y.slider}>
// //           <img
// //             className={y.slide}
// //             src={
// //               //   image.signatura
// //               process.env.REACT_APP_SERVER + `/${image.signatura}`
// //             }
// //             alt={image.id}
// //           />
// //           <div className={y.exif}>
// //             {image.naziv}, {image.opis}, {image.lokacija},{' '}
// //             {image.latitude}, {image.longitude}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectAPhoto, selectidX } from '../redux/rtk/gallerySlice';

// function PhotoViewer() {
//   const selectedPhoto = useSelector(selectAPhoto);
//   const selectedIdX = useSelector(selectidX);
//   console.log(selectedIdX, selectedPhoto);
//   return (
//     <div>
//       {selectedPhoto && (
//         <img
//           src={selectedPhoto.signatura}
//           alt={selectedPhoto.rank_number}
//         />
//       )}
//     </div>
//   );
// }

// export default PhotoViewer;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getPhotos,
  getAPhoto,
  selectPhotos,
  increment,
  decrement,
  selectAPhoto,
} from '../redux/rtk/gallerySlice';

function Photos() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const selectedPhoto = useSelector(selectAPhoto);

  //redux
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleNextPhoto = () => {
    dispatch(increment());
  };

  const handlePreviousPhoto = () => {
    dispatch(decrement());
  };

  useEffect(() => {
    if (selectedPhoto === undefined) {
      // Fetch individual photo data when component loads or idX changes
      dispatch(getAPhoto(selectedPhoto?.id));
    }
  }, [dispatch, selectedPhoto]);

  return (
    <div>
      <div>
        <Link to="/photos/1">slija 1</Link>
        <Link to="/photos/2">slija 2</Link>
      </div>
      <div>
        <button onClick={handlePreviousPhoto}>Previous Photo</button>
        <button onClick={handleNextPhoto}>Next Photo</button>
      </div>
      {selectedPhoto && (
        <div>
          <img
            src={
              process.env.REACT_APP_SERVER_PUB +
              `/${selectedPhoto.signatura}`
            }
            alt={selectedPhoto.naziv}
          />
          <div>
            {selectedPhoto.naziv}, {selectedPhoto.opis},{' '}
            {selectedPhoto.lokacija}, {selectedPhoto.latitude},{' '}
            {selectedPhoto.longitude}
          </div>
        </div>
      )}
      {/* Render the list of photos if needed */}
      {photos.map(photo => (
        <img
          key={photo.id}
          src={
            process.env.REACT_APP_SERVER_PUB + `/${photo.signatura}`
          }
          alt={photo.naziv}
        />
      ))}
    </div>
  );
}

export default Photos;
