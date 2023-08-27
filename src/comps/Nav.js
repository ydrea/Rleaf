// import { HashLink as Link } from 'react-router-hash-link';
import './nav.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//

// function ScrollLink({ to, children }) {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const handleClick = e => {
//       e.preventDefault();

//       const targetId = to;
//       const targetElement = document.querySelector(targetId);

//       if (targetElement) {
//         const topOffset = targetElement.offsetTop;
//         window.scrollTo({
//           top: topOffset,
//           behavior: 'smooth',
//         });
//       }
//     };

//     const link = document.querySelector(`a[href='${to}']`);
//     link.addEventListener('click', handleClick);

//     return () => {
//       link.removeEventListener('click', handleClick);
//     };
//   }, [to]);

//   return (
//     <a href={to} className="nav-links">
//       {children}
//     </a>
//   );
// }

//
export const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div className="navbar">
        <nav className="navbar-container">
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
                <p>opservatorij</p>
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
                <p>medijateka</p>
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
