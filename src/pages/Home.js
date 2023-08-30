import 'leaflet/dist/leaflet.css';
import './home.css';
import Footer from '../comps/Footer';
import { Nav } from '../comps/Nav';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
//
function Home() {
  const { ref: rockRef, inView: jelNije } = useInView({
    rootMargin: '0px 0px -3% 0px',
    triggerOnce: false, //
  });

  console.log('jelNije:', jelNije); //
  //
  return (
    <div className="home">
      {/* <section className="section"> */}{' '}
      <div className="img-container">
        <img
          src="img-home-g.png"
          alt="img"
          className={`image ${jelNije ? 'animateImg' : ''}`}
        />
        <h1 className={`vozi ${jelNije ? 'animateVozi' : ''}`}>
          opservatorij
        </h1>

        <h1 className={`aepali ${jelNije ? 'animateAepali' : ''}`}>
          krajobraza
        </h1>
        <div className="podnaslov">
          Interdisciplinarna platforma posvećena istraživanju i
          razumijevanju krajobraza
          <div className="line" ref={rockRef} />
        </div>
      </div>
      {/* //sections */}
      <div className="one" style={{ fontSize: '30px' }}>
        'Opservatorij' je platforma koja djeluje kao virtualni
        kolaborativni subjekt koji okuplja stručnjake različitih
        profila. U središtu naše pažnje je koncept krajobraza koji se
        sve više prepoznaje kao ključna komponenta globalnog nasljeđa
        i održivog razvoja. Naša misija je pružiti integralan pristup
        razumijevanju krajobraza kroz kombinaciju prirodnih,
        kulturno-povijesnih i vizualnih čimbenika.
      </div>
      <div className="two">
        <div style={{ position: 'relative' }}>
          {' '}
          <img
            src="home1.png"
            style={{
              width: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              display: 'grid',
              placeItems: 'center',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20vh',
              color: 'white',
              textAlign: 'center',
              fontSize: '30px',
              zIndex: '33',
            }}
          >
            Pilot područje Opservatorija je Banovina ili Banija,
            marginalizirana regija Hrvatske, izrazito pogođena ratnim
            stradanjima tijekom 1990-ih i jakim potresom 2020. godine,
            a pilot projekti koje provodi tim Opservatorija su
            Opservatorij krajobraza Banovina/Banije i EWAP: Ugrožena
            drvena arhitektura Banovine/Banije, Pokuplja i Posavine.
          </div>
        </div>
      </div>
      <div className="three" style={{ fontSize: '30px' }}>
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
        <div style={{ verticalAlign: 'left' }}>
          {' '}
          <img src="home2.png" style={{ verticalAlign: 'left' }} />
        </div>{' '}
        <p>
          Pozivamo vas da se pridružite našem putovanju prema očuvanju
          i razumijevanju krajobraza.
        </p>{' '}
        {/* </div> */}
      </div>
      <div className="four" style={{ fontSize: '30px' }}>
        Za sve informacije vezane uz ‘Opservatorij krajobraza’,
        slobodno nas kontaktirajte putem e-maila na
        [info@croatianlandscape.hr] ili telefonom na [+385 xx xxx
        xxxx].
      </div>
      <div style={{ fontSize: '30px' }}>
        Zanima vas više o našem radu i misiji? Pretplatite se na naš
        newsletter i budite u tijeku s našim istraživanjima i
        aktivnostima. Unesite svoju e-mail adresu i pridružite se
        putovanju prema očuvanju i razumijevanju krajobraza."
      </div>
      <Footer style={{ position: 'apsolute', bottom: '0' }} />
    </div>
  );
}

export default Home;
