import './nav.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//

//
export const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div className="navbar">
        <nav className="navbar-container">
          {/* <img src="img-nav.png" /> */}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* OPSERVATORIJ */}
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>početna</p>
              </Link>
            </li>
            {/* OPSERVATORIJ */}
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>o opservatoriju</p>
              </Link>
            </li>
            {/* PROJEKTI */}
            <li className="nav-item">
              <Link
                to="/projects"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>projekti</p>
              </Link>
            </li>
            {/* MAPA */}
            <li className="nav-item">
              <Link
                to="/mapa"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>karta</p>
              </Link>
            </li>
            {/* PHOTOS */}
            <li className="nav-item">
              <Link
                to="/photos"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>fototeka</p>
              </Link>
            </li>
            {/* CONTACT */}
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>kontakt</p>
              </Link>
            </li>
            {/* admin */}
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <p>admin</p>
              </Link>
            </li>
          </ul>
          {/* {button && <button>SIGN UP</button>} */}
          <div className="navline-div" />
        </nav>
      </div>{' '}
    </>
  );
};
