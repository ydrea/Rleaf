import React from 'react';
import './contact.css';
import Footer from '../comps/Footer';

function Contact() {
  return (
    <div className="gallery">
      <section>
        <div className="naslov-container">
          <h1>opservatorij</h1>
          <div className="line-div0" />
        </div>
        <div className="un">
          {' '}
          <p>
            info@croatianlandscape.hr Opservatorij krajobraza
            Sveučilište u Zagrebu, Agronomski fakultet izv.prof.dr.sc.
            Goran Andlar Svetošimunska cesta 25 10000, Zagreb
          </p>
          <hr className="gren" />
          <p>
            Za sve informacije vezane uz ‘Opservatorij krajobraza’,
            slobodno nas kontaktirajte putem e-maila na
            [info@croatianlandscape.hr] ili telefonom na [+385 95
            9123055]. Zanima vas više o našem radu i misiji?
            Pretplatite se na naš newsletter i budite u tijeku s našim
            istraživanjima i aktivnostima. Unesite svoju e-mail adresu
            i pridružite se putovanju prema razumijevanju i očuvanju
            krajobraza.
          </p>
        </div>{' '}
        <Footer />{' '}
      </section>{' '}
    </div>
  );
}

export default Contact;
