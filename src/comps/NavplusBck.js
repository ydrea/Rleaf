import './nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
export const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`dropdown ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <Link to={submenu.to}>{submenu.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export const Nav = () => {
  const [click, setClick] = useState(false);
  // const [hovered, setHovered] = useState(null);
  // const [dropdown, dropdownSet] = useState(true);
  const [subMenu, subMenuSet] = useState({});

  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    setHovered(null); // reset the hover when the menu is closed
  };

  const handleSubMenuClick = index => {
    subMenuSet(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  //
  const menuItems = [
    { label: 'početna', to: '/' },
    { label: 'o opservatoriju', to: '/about' },
    {
      label: 'projekti',
      to: '/projects',
      submenu: [
        { label: 'Banija', to: 'banija' },
        { label: 'EWAP', to: 'ewap' },
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
              <li className="nav-item" key={index}>
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={
                        subMenu[index] ? 'true' : 'false'
                      }
                      onClick={() => handleSubMenuClick(index)}
                    >
                      {item.label}
                    </button>
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
