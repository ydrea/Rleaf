import 'leaflet/dist/leaflet.css';
import './home.scss';
import { Footer } from '../comps/Footer';
import { Nav } from '../comps/Nav';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
//
function Home() {
  const { ref: rockRef, inView: jelNije } = useInView({
    rootMargin: '0px 0px -10% 0px',
    triggerOnce: false, // Ensure it triggers only once
  });

  console.log('jelNije:', jelNije); // Check in the
  //
  return (
    <>
      {' '}
      <div className="home">
        {/* <section className="section1"> */}{' '}
        <div className="img-container">
          <img
            src="img-home-g.png"
            alt="img"
            className={`image ${jelNije ? 'animateImg' : ''}`}
          />
          <h1 className="vozi">opservatorij</h1>

          <h1 className={`aepali ${jelNije ? 'animateAepali' : ''}`}>
            krajobraza
          </h1>
          <p>
            Interdisciplinarna platforma posvećena istraživanju i
            razumijevanju krajobraza
            <div className="line-div" ref={rockRef} />
          </p>
        </div>
        {/* </section> */}
        <section className="section2">
          <div className="about">
            <p>O opservatoriju </p>
            Opservatorij krajobraza je interdisciplinarna platforma za
            istraživanje krajobraza i razvoj temeljen na krajobrazu.
            2023. godine počeo je sa radom kao virtualni kolaborativni
            subjekt, a inicijalnu grupu čine stručnjaci različitih
            profila:
            <ul>
              <li>
                {' '}
                dr.sc. Goran Andlar, izvanredni profesor na
                Agronomskom fakultetu Sveučilišta u Zagrebu (UNIZG)
              </li>
              <li>
                dr.sc. Sanja Lončar, izvanredna profesorica na
                Filozofskom fakultetu (UNIZG)
              </li>
              <li>
                dr.sc. Hrvoje Tomić, izvanredni profesor na
                Agronomskom fakultetu (UNIZG)
              </li>
              <li>
                mag. art. Davor Konjikušić, umjetnički asistent na
                Akademiji dramskih umjetnosti (UNIZG)
              </li>
              <li>
                dr.sc. Aleksandar Lukić, redoviti profesor na
                Prirodoslovno-matematičkom fakultetu (UNIZG)
              </li>
              <li>
                dr.sc. Filip Šrajer, prostorni planer i urbanist,
                osnivač tvrtke EKOMENA d.o.o.
              </li>
              <li>
                Damir Gamulin, grafički dizajner, osnivač tvrtke
                Organizirano oblikovanje d.o.o.
              </li>
            </ul>{' '}
          </div>
        </section>
        <section className="section3">
          <div className="homeimg">
            <img src="home1.png" />
          </div>
          <div className="textinimg">
            Pored istraživanja, ‘Opservatorij’ se bavi
            dokumentiranjem, monitoringom, edukacijom te promoviranjem
            interdisciplinarnih metoda. Smatramo da je zaštita i
            razumijevanje krajobraza ključna za otpornost i
            regeneraciju zajednica...
          </div>
        </section>
        <section className="section4">
          <div className="homeimg">
            <img src="home2.png" />
          </div>
          <div className="Titleinimg">Zašto je važan krajobraz?</div>
        </section>
        <section className="section5">
          <div className="aboutright">
            Koncept krajobraza zadnjih 30 ak godina dobiva značajan
            zamah na globalnoj razini. Smatra se važnim (1) elementom
            globalnog nasljeđa, (2) dobro je od javnog interesa, (3)
            očuvanje krajobraza važno je za stvaranje otpornosti
            zajednice (4) smatra se da može generirati regeneraciju,
            rast i oporavak zajednice. Koncept krajobraza nosi sa
            sobom priču o tome da sav prostor oko nas zaslužuje
            održivi razvoj, ne samo onaj zaštićeni. Koncept krajobraza
            se zapravo stvara kroz sve prisutniji kritiku sektorskom
            sagledavanju prostora, i zapravo strahu od neizvjesnosti
            što nam klimatske promjene nose i gubitku odnosa na
            relaciji čovjek – okoliš. Razumjeti danas krajobraz znači
            promatrati ga kroz različite prirodnih,
            kulturno-povijesnih, vizualnih, materijalnih i
            nematerijalnih čimbenika. Primjenjivati krajobrazni
            pristup u nekom istraživanju, studiji, analizi znači
            pristupati prostoru integralno, dakle spajati znanja o
            različitim čimbenicima. Danas postoji niz metoda i alata
            koje nazivamo krajobraznim pristupom, prepoznati su na
            globalnoj razini, dio su paradigme održivog razvoja - ali
            imaju poteškoća sa ulaskom u sustav - u sektorske
            politike, zakonodavstvo. Zato se smatra da
            institucionalizacija tema krajobraza mora biti progresivna
            i znanstveno utemeljena.
          </div>
        </section>
        <section className="section6">
          <div className="homeimg">
            <img src="home3.png" />
          </div>
          <div className="Titleinimg">Čime se bavi opservatorij?</div>
        </section>
        <section className="section7">
          <div className="aboutleft">
            Konvencija o europskim krajobrazima opservatorijima
            krajobraza predviđa važnu ulogu u: (1) dokumentiranju i
            monitoringu krajobraza i čimbenika koji ga tvore, (2)
            omogućavanju razmjene podataka, (3) edukaciji šire
            javnosti 4) eskperimentiranju interdisciplinarnim metodama
            i (5) povezivanju znanosti, lokalne zajednice i samouprave
            te tijela državne uprave. To znači da se ne radi samo
            opserviranju prostora - već se radi i opserviranju nad
            protokolima i politikama - monitoring implementacije teme
            krajobraza. U Europi su opservatoriji krajobraza
            uspostavljeni i djeluju u poznatim mediteranskim ruralnim
            regijama: Toskani i Kataloniji.
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
