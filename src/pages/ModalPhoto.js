import './ModalPhoto.css';
import { useState, useEffect } from 'react';

//
const ModalPhoto = ({
  isOpen,
  closeModal,
  children,
  thumbnailUrl,
  signatura,
  currentPhotoIndex,
  filteredPhotos,
  setCurrentPhotoIndex,
}) => {
  // const [currentPhotoIndex, setCurrentPhotoIndex] =
  //   useState(currentPhotoIndex);

  // useEffect(() => {
  //   if (confirmationVisible) {
  //     // Automatically close the modal after 2 seconds
  //     const timeoutId = setTimeout(() => {
  //       closeModal();
  //       setConfirmationVisible(false);
  //     }, 2000);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [confirmationVisible, closeModal]);

  if (!isOpen) return null;
  useEffect(() => {
    console.log(currentPhotoIndex, filteredPhotos[currentPhotoIndex]);
  }, [currentPhotoIndex]);

  const currentPhotoUrl =
    filteredPhotos.length > 0
      ? process.env.REACT_APP_SERVER_PUB +
        `/${filteredPhotos[currentPhotoIndex].signatura}`
      : ''; // Provide a default empty URL if there are no photos

  //
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={closeModal}>
          X
        </button>
        <img src={currentPhotoUrl} />
        {children}
      </div>
      <button
        className="prev"
        onClick={() => {
          setCurrentPhotoIndex(prevIndex => prevIndex - 1);
          console.log('prev');
        }}
        disabled={currentPhotoIndex === 0}
      >
        Prev
      </button>
      <button
        className="next"
        onClick={() => {
          setCurrentPhotoIndex(prevIndex => prevIndex + 1);
          console.log('next');
        }}
        disabled={currentPhotoIndex === filteredPhotos.length - 1}
      >
        Next
      </button>
    </div>
  );
};
export default ModalPhoto;
