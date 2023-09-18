import React from 'react';
import './contact.css';
import Footer from '../comps/Footer';

function Contact() {
  return (
    <div className="contact">
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />
        {/* <p>
          Interdisciplinarna platforma posvećena istraživanju i
          razumijevanju krajobraza
        </p> */}
      </div>
      <div className="un">
        {' '}
        <p>
          info@croatianlandscape.hr Opservatorij krajobraza
          Sveučilište u Zagrebu, Agronomski fakultet izv.prof.dr.sc.
          Goran Andlar Svetošimunska cesta 25 10000, Zagreb
        </p>
        <p>
          Za sve informacije vezane uz ‘Opservatorij krajobraza’,
          slobodno nas kontaktirajte putem e-maila na
          [info@croatianlandscape.hr] ili telefonom na [+385 xx xxx
          xxxx].
        </p>
        <p>
          Zanima vas više o našem radu i misiji? Pretplatite se na naš
          newsletter i budite u tijeku s našim istraživanjima i
          aktivnostima. Unesite svoju e-mail adresu i pridružite se
          putovanju prema očuvanju i razumijevanju krajobraza.
        </p>
      </div>{' '}
      <Footer />{' '}
    </div>
  );
}

export default Contact;
