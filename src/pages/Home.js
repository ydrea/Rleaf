import 'leaflet/dist/leaflet.css';
import './home.css';
import Footer from '../comps/Footer';
import { Nav } from '../comps/Nav';
import { useEffect, useState, useRef } from 'react';
//
import Hline from '../comps/Line';
import gridHV from '../assets/GRID H V.svg';
import gridH from '../assets/GRID H.svg';
import gridV from '../assets/GRID V.svg';
import diag from '../assets/DIA G.svg';
//
//
export default function Home() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  return (
    <div>
      <div className="home">
        <section>
          <div className="gridcnt">
            {' '}
            <img src={gridH} className="gridh" />
            <img src={gridV} className="gridv" />
          </div>
          <div className="S0">
            <div className="vozi">opservatorij</div>
            <div className="pali">krajobraza </div>
            <div className="podnaslov">
              Interdisciplinarna platforma posvećena istraživanju
              krajobraza i razvoju temeljenom na krajobrazu{' '}
            </div>
          </div>
        </section>
        {/* //Sections */}

        <section>
          <div className="S1">
            {' '}
            'Opservatorij krajobraza' je kolaborativna platforma koja
            okuplja znanstvenike i stručnjake različitih profila. U
            središtu naše pažnje je koncept krajobraza koji se sve
            više prepoznaje kao ključna komponenta globalnog nasljeđa
            i održivog razvoja. Uspostavljen zbog nedovoljne
            istraženosti, neprisutnosti podataka, niskog stupnja
            svijesti o karakteristikama te sveukupnoj neiskorištenosti
            potencijala hrvatskog krajobraza. Naša misija je pružiti
            integralan pristup razumijevanju, prezentaciji i očuvanju
            krajobraza te promišljati razvoj temeljen na krajobrazu.
          </div>
        </section>

        <div className="S2">
          <div className="img-container">
            {/* <section> */}
            <img src="home2.png" className="img2" />
            <img src={gridHV} className="gridhv" />{' '}
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
            {/* </section>{' '} */}
          </div>
        </div>
        <div className="S3">
          <section>
            {' '}
            <img className="img3" src="home3.png" />
          </section>
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
            <section>
              {' '}
              <div className="tli">
                Zanima vas više o našem radu i misiji? Pretplatite se
                na naš newsletter i budite u tijeku s našim
                istraživanjima i aktivnostima. Unesite svoju e-mail
                adresu i pridružite se putovanju prema razumijevanju i
                očuvanju krajobraza.
              </div>
            </section>
          </div>
        </div>
        {/* <Hline color="#7e7e77" height="2px" width="100%" />{' '} */}
      </div>{' '}
      <div className="dno">
        <Footer />
      </div>
    </div>
  );
}
