import React from 'react';
import './footer.css';
import logo from '../assets/asset5.svg';
import Hline from './Line';
//
export default function Footer() {
  return (
    <div className="footer">
      <div className="logo-container">
        {' '}
        <img src={logo} alt="Logo" className="logo" />
        <p className="roll">
          {' '}
          Uvjeti korištenja "Sve fotografije i tekstovi objavljeni na
          ovom portalu podliježu CC BY-NC-SA 4.0 licenci. Ova licenca
          dopušta nekomercijalno umnožavanje, dijeljenje i mijenjanje,
          uz navođenje autorstva na način koji je specificirao autor i
          uz daljnje dijeljenje pod istim uvjetima. Obratite nam se
          ukoliko su vam potrebne fotografije u izvornoj veličini."
        </p>
      </div>
    </div>
  );
}
