import React from 'react';
import { Nav } from './Nav';
import Logo from '../assets/logo.png';

//
export const Header = () => {
  return (
    <>
      <img src={Logo} />
      <Nav />
    </>
  );
};
