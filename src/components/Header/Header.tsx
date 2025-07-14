import { useRef, useState } from 'react'
import { NavLink } from 'react-router'

import logo from '../../assets/logo.svg'
import './Header.sass'

export const Header = () => {
  const checkBoxRef = useRef<HTMLInputElement>(null)

  const hideMobileMenu = () => {
    if (checkBoxRef.current) {
      checkBoxRef.current.checked = false
    }
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header id='header' className={isMobileMenuOpen ? 'fixed' : ''}>
        <NavLink to='/'>
          <img src={logo} alt='logo' width={167} />
        </NavLink>
        <input
          type='checkbox'
          id='menu-button-checkbox'
          ref={checkBoxRef}
          onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
        />
        <label className='menu-button' htmlFor='menu-button-checkbox'>
          <svg width='47' height='29' viewBox='0 0 47 29' xmlns='http://www.w3.org/2000/svg'>
            <line x1='5' y1='0.5' x2='47' y2='0.5' stroke='black' className='line-3' />
            <line x1='5' y1='7.5' x2='47' y2='7.5' stroke='black' className='line-3' />
            <line x1='5' y1='14.5' x2='47' y2='14.5' stroke='black' className='line-1' />
            <line x1='5' y1='14.5' x2='47' y2='14.5' stroke='black' className='line-2' />
            <line x1='5' y1='28.5' x2='47' y2='28.5' stroke='black' className='line-3' />
            <line x1='5' y1='21.5' x2='47' y2='21.5' stroke='black' className='line-3' />
          </svg>
        </label>
        <menu className='main-menu' onClick={hideMobileMenu}>
          <div className='menu-item-with-submenu' style={{ width: 134 }}>
            <NavLink to='/projects'>projekti</NavLink>
            <div className='submenu'>
              <NavLink to='/projects/banija' style={{ width: 134 }}>
                Banija
              </NavLink>
              <NavLink to='/projects/ewap'>EWAP</NavLink>
            </div>
          </div>
          <NavLink to='/maps'>mape</NavLink>
          <NavLink to='/photos'>fototeka</NavLink>
          <NavLink to='/3d-scenes'>3d scene</NavLink>
          <NavLink to='/about'>o nama</NavLink>
          <NavLink to='/contact'>kontakt</NavLink>
        </menu>
      </header>
      <div className='dummy-header' />
    </>
  )
}
