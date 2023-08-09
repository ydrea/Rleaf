import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Card = () => {
  const { id } = useParams();
  const [mao, setMao] = useState(null); // Initialize mao as null

  useEffect(() => {
    const fetchData = async ({ id }) => {
      try {
        const response = await axios.get(
          `http://localhost:3500/rank?rank_number=${id}`
        );
        console.log(response.data);
        console.log(
          `${process.env.REACT_APP_SERVER_PUB}/${encodeURIComponent(
            response.data.signatura
          )}`
        );

        const maoFromResponse = response.data.signatura; // This is a string
        setMao(maoFromResponse); // Update the state with the signatura string
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData({ id });
  }, [id]);

  return (
    <>
      return (
      <>
        <img
          src={`${
            process.env.REACT_APP_SERVER_PUB
          }/${encodeURIComponent(mao)}`}
          alt="Slika"
        />
      </>
      );
    </>
  );
};
