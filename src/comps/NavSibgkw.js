import './nav.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Nav = () => {
  const [click, setClick] = useState(false);
  const [hovered, setHovered] = useState(null); // To store the hovered item
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
    setHovered(null); // Reset the hovered item when the menu is closed
  };

  // Function to handle hover
  const handleHover = index => {
    setHovered(index);
  };
  const menuItems = [
    { label: 'početna', to: '/' },
    { label: 'o opservatoriju', to: '/about' },
    { label: 'projekti', to: '/projects' },
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
              </li>
            ))}
          </ul>
          <div className="navline-div" />
        </nav>
      </div>
    </>
  );
};
