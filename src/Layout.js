import React from 'react';
import { Header } from './comps/Header';
import { Footer } from './comps/Footer';

import s from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={s.c}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
