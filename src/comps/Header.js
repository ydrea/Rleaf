import React from 'react';
import Search from './Search';
import { Nav } from './Nav';
import Logo from '../assets/logo.png';
import t from './header.module.scss';
//
export const Header = () => {
  return (
    <div className={t.hed}>
      <div className={t.top}>
        <div className={t.logo}>
          <img src={Logo} height={40} />
          pservatorijumum
        </div>
        <Search />
      </div>
      <Nav />
    </div>
  );
};
