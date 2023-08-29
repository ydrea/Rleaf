import React from 'react';
// import { Header } from './comps/Header';
// import Footer from './comps/Footer';
import './layout.css';
import { Nav } from './comps/Nav';
//

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="izkompenzuj">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
