import React from 'react';
import './footer.css';

//
export default function Footer() {
  return (
    <div className="footer">
      {/* da)
      <a className={s.a} href="https://github.com/ydrea">
        ydrea
      </a>
      (mnation */}
      <img src="../../logoBmp.png" />
      <p>
        {' '}
        Uvjeti korištenja "Sve fotografije i tekstovi objavljeni na
        ovom portalu podliježu CC BY-NC-SA 4.0 licenci. Ova licenca
        dopušta nekomercijalno umnožavanje, dijeljenje i mijenjanje,
        uz navođenje autorstva na način koji je specificirao autor i
        uz daljnje dijeljenje pod istim uvjetima. Obratite nam se
        ukoliko su vam potrebne fotografije u izvornoj veličini. "
      </p>
    </div>
  );
}
