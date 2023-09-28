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
          Interdisciplinarna platforma posvećena istraživanju
          krajobraza i razvoju temeljenom na krajobrazu{' '}
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
          <div className="img-container">
            <img src="home2.png" className="img2" />
            <img className="img3" src="home3.png" />

            <div className="txt2">
              <p>
                {' '}
                Pored istraživanja, ‘Opservatorij’ se bavi
                dokumentiranjem, monitoringom, edukacijom te
                promoviranjem interdisciplinarnih metoda.
              </p>
              <p>
                Smatramo da je zaštita i razumijevanje krajobraza
                ključna za otpornost i regeneraciju zajednica.
              </p>
            </div>
          </div>

          <div className="txt3">
            <div className="ena">
              Pozivamo vas da se pridružite našem putovanju prema
              očuvanju i razumijevanju krajobraza.
            </div>{' '}
            <div className="dve">
              Za sve informacije vezane uz ‘Opservatorij krajobraza’,
              slobodno nas kontaktirajte
              <p>
                putem e-maila na [
                <span>info@croatianlandscape.hr</span>]
              </p>{' '}
              ili telefonom na [<span>+385 95 9123055</span>].
            </div>
            <div className="tli">
              Zanima vas više o našem radu i misiji? Pretplatite se na
              naš newsletter i budite u tijeku s našim istraživanjima
              i aktivnostima. Unesite svoju e-mail adresu i pridružite
              se putovanju prema razumijevanju i očuvanju krajobraza.
            </div>
          </div>
        </div>
      </div>

      <div className="dno">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
