import 'leaflet/dist/leaflet.css';
import './home.css';
import Footer from '../comps/Footer';
import { Nav } from '../comps/Nav';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
//
function Home() {
  const ref = useRef();
  const { ref: rockRef, inView: jelNije } = useInView({
    rootMargin: '0px 0px -3% 0px',
    triggerOnce: false, //
  });

  console.log('jelNije:', jelNije); //
  //
  return (
    <div className="home">
      {/* <section className="section"> */}{' '}
      <div className="cont0">
        <img src="img-home-g.png" className="img0" />
        <div className="txt0">
          <div className="vozi"> Opservatorij</div>
          <div className="aepali">krajobraza</div>
        </div>

        <div className="podnaslov">
          Interdisciplinarna platforma posvećena istraživanju i
          razumijevanju krajobraza
          <div className="line" ref={rockRef} />
        </div>
      </div>
      {/* //Sections */}
      <div className="S1">
        'Opservatorij' je platforma koja djeluje kao virtualni
        kolaborativni subjekt koji okuplja stručnjake različitih
        profila. U središtu naše pažnje je koncept krajobraza koji se
        sve više prepoznaje kao ključna komponenta globalnog nasljeđa
        i održivog razvoja. Naša misija je pružiti integralan pristup
        razumijevanju krajobraza kroz kombinaciju prirodnih,
        kulturno-povijesnih i vizualnih čimbenika.
      </div>
      <div className="S2">
        <div className="cont2">
          <img src="home1.png" className="img1" />
          <div className="txt2">
            Pilot područje Opservatorija je Banovina ili Banija,
            marginalizirana regija Hrvatske, izrazito pogođena ratnim
            stradanjima tijekom 1990-ih i jakim potresom 2020. godine,
            a pilot projekti koje provodi tim Opservatorija su
            Opservatorij krajobraza Banovina/Banije i EWAP: Ugrožena
            drvena arhitektura Banovine/Banije, Pokuplja i Posavine.
          </div>
        </div>
      </div>
      <div className="S3">
        <div className="constrainer">
          <img src="home2.png" className="img2" />
          <div>
            Pozivamo vas da se pridružite našem putovanju prema
            očuvanju i razumijevanju krajobraza.
          </div>
        </div>
      </div>
      <div className="S4">
        Za sve informacije vezane uz ‘Opservatorij krajobraza’,
        slobodno nas kontaktirajte putem e-maila na
        [info@croatianlandscape.hr] ili telefonom na [+385 xx xxx
        xxxx].
      </div>
      <div style={{ fontSize: '30px', color: 'black' }}>
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
