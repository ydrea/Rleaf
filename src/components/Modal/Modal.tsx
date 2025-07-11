import { useState, useEffect } from 'react';

import './Modal.css';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  thumbnailUrl?: string;
  signatura?: string;
};

//
export const Modal = ({
  isOpen,
  closeModal,
  children,
  thumbnailUrl,
  signatura,
}: Props) => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

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
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='modal-close-button' onClick={closeModal}>
          X
        </button>
        <img src={thumbnailUrl} alt={signatura} style={{ width: '20%' }} />
        {children}
      </div>
    </div>
  );
};
