// import React from 'react';
import { useEffect, useState } from 'react';

export const temakz = () => {
  const [data, dataSet] = useState([]);
  const getTkz = async () => {
    try {
      const rezult = await fetch(
        `${process.env.REACT_APP_SERVER}+/wfs_tkz`
      );
      const jsonData = await rezult.data();
      dataSet(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTkz();
  }, []);
  return { data };
};
