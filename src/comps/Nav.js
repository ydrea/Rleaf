import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './nav.module.scss';
//
export const Nav = () => {
  return (
    <nav className={s.nav}>
      <NavLink className={s.navlink} to="/">
        home
      </NavLink>
      <NavLink className={s.navlink} to="/about">
        about
      </NavLink>
      <NavLink className={s.navlink} to="/mapa">
        map
      </NavLink>
      <NavLink className={s.navlink} to="/gallery">
        gallery
      </NavLink>
    </nav>
  );
};
