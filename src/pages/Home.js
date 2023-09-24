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
    rootMargin: '0px 0px -11% 0px',
    triggerOnce: true, //
  });

  console.log('jelNije:', jelNije); //

  // Get the viewport height in pixels
  const viewportHeight = window.innerHeight;

  // Calculate the element's height in pixels
  const elementHeight = 0.6667 * viewportHeight; // 66.67% in decimal form

  console.log(elementHeight); // This will be the height in pixels
  // Convert the element's height to vh units
  const elementHeightInVh = (elementHeight / viewportHeight) * 100;

  console.log(elementHeightInVh); // This will be the equivalent height in vh units

  //
  return (
    <div className="home">
      {/* {jelNije ? ( */}
      <div className="cont0">
        <div className="vozi">opservatorij</div>
        <div className="pali">krajobraza </div>
        <div className="podnaslov">
          Interdisciplinarna platforma posvećena istraživanju i
          razumijevanju krajobraza
        </div>
      </div>
      {/* </div> */}
      {/* //Sections */}
      <div className="S1">
        'Opservatorij krajobraza' je kolaborativna platforma koja
        okuplja znanstvenike i stručnjake različitih profila. U
        središtu naše pažnje je koncept krajobraza koji se sve više
        prepoznaje kao ključna komponenta globalnog nasljeđa i
        održivog razvoja. Uspostavljen zbog nedovoljne istraženosti,
        neprisutnosti podataka, niskog stupnja svijesti o
        karakteristikama te sveukupnoj neiskorištenosti potencijala
        hrvatskog krajobraza. Naša misija je pružiti integralan
        pristup razumijevanju, prezentaciji i očuvanju krajobraza te
        promišljati razvoj temeljen na krajobrazu.
      </div>
      <div className="S2">
        <div className="cont2">
          <img src="home2.png" className="img2" />
          <div className="txt2">
            ‘Opservatorij’ se bavi dokumentiranjem, monitoringom,
            edukacijom te promoviranjem interdisciplinarnih metoda.
            Smatramo da je zaštita i razumijevanje krajobraza ključna
            za otpornost i regeneraciju zajednica.
          </div>
        </div>
      </div>{' '}
      <div className="S3">
        <div className="cont3">
          <img
            src="home3.png"
            style={{
              position: 'absolute',
              top: '55px',
              left: '0',
              width: '50%',
              height: 'auto',
            }}
          />
          <div className="txt3">
            Pozivamo vas da se pridružite našem putovanju prema
            očuvanju i razumijevanju krajobraza.
          </div>{' '}
        </div>
      </div>
      <div className="S4">
        <div className="txt4">
          Za sve informacije vezane uz ‘Opservatorij krajobraza’,
          slobodno nas kontaktirajte putem e-maila na
          [info@croatianlandscape.hr] ili telefonom na [+385 95
          9123055]. Zanima vas više o našem radu i misiji? Pretplatite
          se na naš newsletter i budite u tijeku s našim
          istraživanjima i aktivnostima. Unesite svoju e-mail adresu i
          pridružite se putovanju prema razumijevanju i očuvanju
          krajobraza.
        </div>
      </div>
      <div>
        <Footer className="foo" />
      </div>
    </div>
  );
}

export default Home;
