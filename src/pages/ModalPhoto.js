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
  zip,
  setCurrentPhotoIndex,
}) => {
  // const [currentPhotoIndex, setCurrentPhotoIndex] =
  //   useState(currentPhotoIndex);

  // useEffect(() => {
  console.log(children);
  //   if (confirmationVisible) {
  //     // Automatically close the modal after 2 seconds
  //     const timeoutId = setTimeout(() => {
  //       closeModal();
  //       setConfirmationVisible(false);
  //     }, 2000);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, []);

  if (!isOpen) return null;
  // useEffect(() => {
  //   console.log(
  //     'ovaj zip',
  //     currentPhotoIndex,
  //     'ovaj zip',
  //     zip[currentPhotoIndex]
  //   );
  // }, [currentPhotoIndex]);

  const currentPhotoUrl =
    zip.length > 0
      ? process.env.REACT_APP_SERVER_PUB +
        `/${zip[currentPhotoIndex].signatura}`
      : '';
  //
  const currentContents = zip[currentPhotoIndex];
  console.log('Cc', currentContents);
  //
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={closeModal}>
          X
        </button>
        <img src={currentPhotoUrl} />
        <div className="selected-div2">
          <p>{currentContents.naziv}</p>
          <p>{currentContents.signatura}</p>
          <p>{currentContents.opis}</p>
        </div>
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
        disabled={currentPhotoIndex === zip.length - 1}
      >
        Next
      </button>
    </div>
  );
};
export default ModalPhoto;
