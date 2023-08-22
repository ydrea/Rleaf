import React from 'react';
// import { Header } from './comps/Header';
import { Footer } from './comps/Footer';

import s from './layout.module.scss';
import { Nav } from './comps/Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className={s.c}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
