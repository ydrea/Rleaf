import React from 'react';
import { Nav } from './Nav';
import Logo from '../assets/logo.png';
import st from './nav.module.scss';
//
export const Header = () => {
  return (
    <div className={st.log}>
      <img src={Logo} height={40} />
      pservatorijumum
      <Nav />
    </div>
  );
};
