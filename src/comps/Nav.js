import React from 'react';
import { Link } from 'react-router-dom';

//
export const Nav = () => {
  return (
    <nav>
      Nav
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/mapa">map</Link>
      <Link to="/gallery">gallery</Link>
    </nav>
  );
};
