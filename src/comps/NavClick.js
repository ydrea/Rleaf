import './nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
export const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`dropdown ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="nav-links">
          <Link className="nav-links" to={submenu.to}>
            <span className="first-letter-white">
              {submenu.label.charAt(0)}
            </span>
            {submenu.label.slice(1)}{' '}
          </Link>
        </li>
      ))}
    </ul>
  );
};
//
export const Nav = () => {
  const [click, setClick] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [subMenu, setSubMenu] = useState({});

  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    setHovered(null); // reset the hover when the menu is closed
  };

  // const handleSubMenuClick = index => {
  //   setSubMenu(prev => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  const menuItems = [
    { label: 'početna', to: '/' },
    { label: 'o opservatoriju', to: '/about' },
    {
      label: 'projekti',
      to: '/projects',
      submenu: [
        { label: 'Banija', to: 'projects/banija' },
        { label: 'EWAP', to: 'projects/ewap' },
      ],
    },
    { label: 'karta', to: '/mapa' },
    { label: 'fototeka', to: '/photos' },
    { label: 'kontakt', to: '/contact' },
    { label: 'admin', to: '/login' },
  ];

  return (
    <>
      <div className="navbar">
        <nav className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {menuItems.map((item, index) => (
              <li
                className={`nav-links ${
                  item.label === 'projekti' ? 'hovered' : ''
                }`}
                key={index}
              >
                {' '}
                {item.submenu ? (
                  <>
                    <Link
                      className="nav-links"
                      aria-expanded={
                        subMenu[index] ? 'true' : 'false'
                      }
                      // onClick={() => handleSubMenuClick(index)}
                    >
                      {item.label}
                    </Link>
                    <Dropdown
                      dropdown={subMenu[index]}
                      submenus={item.submenu}
                    />
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className={`nav-links ${
                      location.pathname === item.to ? 'clicked' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="first-letter-white">
                      {item.label.charAt(0)}
                    </span>
                    {item.label.slice(1)}{' '}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="navline-div" />
        </nav>
      </div>
    </>
  );
};
