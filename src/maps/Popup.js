import React, { useState, useEffect } from 'react';

function PopupComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data and set it in the state
    fetchData().then(response => {
      setData(response);
    });
  }, []);

  return (
    <div>
      {data.map(i => (
        <Popup key={i.id} popUp={i.popUp} />
      ))}
    </div>
  );
}

function Popup({ popUp }) {
  if (!popUp) {
    return null; // Return early if popUp is undefined or falsy
  }

  return (
    <div className="popup">
      {popUp}
      <img
        width="33%"
        src={`http://localhost:3500/photos/${popUp}`}
        alt="slija"
      />
    </div>
  );
}
