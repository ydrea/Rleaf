import 'leaflet/dist/leaflet.css';
import './home.scss';
function Home() {
  return (
    <div className="home-container">
      <h1>opservatorij</h1>
      <h1>krajobraza</h1>
      <p>
        Interdisciplinarna platforma posvećena istraživanju i
        razumijevanju krajobraza
        <div className="line-div" />
      </p>
      <div className="about">
        <p>O opservatoriju </p>
        Opservatorij krajobraza je interdisciplinarna platforma za
        istraživanje krajobraza i razvoj temeljen na krajobrazu. 2023.
        godine počeo je sa radom kao virtualni kolaborativni subjekt,
        a inicijalnu grupu čine stručnjaci različitih profila:
        <ul>
          <li>
            {' '}
            dr.sc. Goran Andlar, izvanredni profesor na Agronomskom
            fakultetu Sveučilišta u Zagrebu (UNIZG)
          </li>
          <li>
            dr.sc. Sanja Lončar, izvanredna profesorica na Filozofskom
            fakultetu UNIZG
          </li>
          <li>
            dr.sc. Hrvoje Tomić, izvanredni profesor na Agronomskom
            fakultetu UNIZG
          </li>
          <li>
            mag. art. Davor Konjikušić, umjetnički asistent na
            Akademiji dramskih umjetnosti UNIZG -
          </li>
          <li>
            dr.sc. Aleksandar Lukić, redoviti profesor na
            Prirodoslovno-matematičkom fakultetu UNIZG
          </li>
          <li>
            dr.sc. Filip Šrajer, prostorni planer i urbanist, osnivač
            tvrtke EKOMENA d.o.o.
          </li>
          <li>
            Damir Gamulin, grafički dizajner, osnivač tvrtke
            Organizirano oblikovanje d.o.o.
          </li>
        </ul>{' '}
      </div>
    </div>
  );
}

export default Home;
