import React from 'react';
import { Nav } from './Nav';
import Logo from '../assets/logo.png';
import t from './header.module.scss';
import Selekt from './Selekt';
//
export const Header = () => {
  return (
    <div className={t.hed}>
      <div>
        <div className={t.logo}>
          <img src={Logo} height={40} />
          pservatorijumum
        </div>
        <Nav />
      </div>
      <div>
        <Selekt />
      </div>
    </div>
  );
};
