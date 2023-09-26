import './nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Dropdown = ({ submenus, dropdown, isDropdownOpen }) => {
  return (
    <ul className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          {submenu.to ? (
            <Link
              to={submenu.to}
              className={`submenu-link ${dropdown ? 'open' : ''}`}
              aria-expanded={dropdown ? 'true' : 'false'}
            >
              <span className="first-letter-white">
                {submenu.label.charAt(0)}
              </span>
              {submenu.label.slice(1)}{' '}
            </Link>
          ) : (
            <span className="submenu-item">
              <span className="first-letter-white">
                {submenu.label.charAt(0)}
              </span>
              {submenu.label.slice(1)}{' '}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export const Nav = () => {
  const [click, setClick] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [subMenu, setSubMenu] = useState({});

  const [isDropdownOpen, isDropdownOpenSet] = useState(false);
  // const handleSubMenuClick = index => {
  //   // Open the dropdown
  //   isDropdownOpenSet(true);

  //   // Start a timeout to close the dropdown after, for example, 3000 milliseconds (3 seconds)
  //   setTimeout(() => {
  //     setIsDropdownOpen(false);
  //   }, 300); // Adjust the duration as needed
  // };

  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    setHovered(null);
  };

  const handleSubMenuClick = index => {
    setSubMenu(prev => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = index === key ? !prev[key] : false;
        return acc;
      }, {}),
    }));
  };

  const menuItems = [
    { label: 'početna', to: '/' },
    { label: 'o nama', to: '/about' },
    {
      label: 'projekti',
      to: '/projects',
      submenu: [
        { label: 'Banija', to: 'projects/banija' },
        { label: 'EWAP', to: 'projects/ewap' },
      ],
    },
    { label: 'karta', to: '/mapa' },
    { label: 'fototeka    ', to: '/photos' },
    { label: 'kontakt', to: '/contact' },
    // { label: 'admin', to: '/login' },
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
                  item.label === 'projekti' ? 'submenu-parent' : ''
                }`}
                key={index}
              >
                {item.submenu ? (
                  <>
                    <Link
                      className="nav-links"
                      aria-expanded={
                        subMenu[index] ? 'true' : 'false'
                      }
                      onClick={() => handleSubMenuClick(index)}
                    >
                      {item.label}
                    </Link>
                    <Dropdown
                      isDropdownOpen={isDropdownOpen}
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
        </nav>{' '}
        <div className="navline-div" />
      </div>
      <div className="mline" />
      <div className="nline" />
      <div className="lline" />
    </>
  );
};
