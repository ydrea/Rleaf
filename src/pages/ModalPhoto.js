import './Modal.css';
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
}) => {
  const [confirmationVisible, setConfirmationVisible] =
    useState(false);

  useEffect(() => {
    if (confirmationVisible) {
      // Automatically close the modal after 2 seconds
      const timeoutId = setTimeout(() => {
        closeModal();
        setConfirmationVisible(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [confirmationVisible, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={closeModal}>
          X
        </button>
        <img src={thumbnailUrl} alt={signatura} />
        {children}
      </div>
      <button
        className="prev"
        onClick={() => {
          const newIndex =
            (currentPhotoIndex - 1 + filteredPhotos.length) %
            filteredPhotos.length;
          setCurrentPhotoIndex(newIndex);
        }}
        disabled={currentPhotoIndex === 0}
      >
        Prev
      </button>
      <button
        className="next"
        onClick={() => {
          const newIndex =
            (currentPhotoIndex + 1) % filteredPhotos.length;
          setCurrentPhotoIndex(newIndex);
        }}
        disabled={currentPhotoIndex === filteredPhotos.length - 1}
      >
        Next
      </button>
    </div>
  );
};
export default ModalPhoto;
