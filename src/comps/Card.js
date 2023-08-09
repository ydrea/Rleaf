import React from 'react';
import { useParams } from 'react-router-dom';

//
export const Card = () => {
  const { id } = useParams();
  return (
    <>
      slija{id}
      <img
        src={process.env.REACT_APP_SERVER_PUB + `/${signatura}`}
        // alt={selectedPhoto.naziv}
      />
    </>
  );
};
