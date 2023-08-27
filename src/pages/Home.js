import 'leaflet/dist/leaflet.css';
import './home.scss';
import { Footer } from '../comps/Footer';
import { Nav } from '../comps/Nav';
function Home() {
  return (
    <>
      <Nav className="nav" />
      <div className="home">
        <div className="img-container">
          <h1>opservatorij</h1>
          <h1>krajobraza</h1>
          <p>
            Interdisciplinarna platforma posvećena istraživanju i
            razumijevanju krajobraza
            <div className="line-div" />
          </p>
        </div>
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
              dr.sc. Goran Andlar, izvanredni profesor na Agronomskom
              fakultetu Sveučilišta u Zagrebu (UNIZG)
            </li>
            <li>
              dr.sc. Sanja Lončar, izvanredna profesorica na
              Filozofskom fakultetu (UNIZG)
            </li>
            <li>
              dr.sc. Hrvoje Tomić, izvanredni profesor na Agronomskom
              fakultetu (UNIZG)
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
        <div className="homeimg1">
          <img src="home1.png" />
        </div>
        <div className="textinimg">
          Pored istraživanja, ‘Opservatorij’ se bavi dokumentiranjem,
          monitoringom, edukacijom te promoviranjem
          interdisciplinarnih metoda. Smatramo da je zaštita i
          razumijevanje krajobraza ključna za otpornost i regeneraciju
          zajednica...
        </div>
        <div className="homeimg2">
          <img src="home2.png" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
