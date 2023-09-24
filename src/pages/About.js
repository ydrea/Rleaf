import Footer from '../comps/Footer';
import './about.css';
export default function About() {
  return (
    <div className="gallery">
      <div className="naslov-container">
        <h1>opservatorij</h1>
        <div className="line-div0" />
      </div>{' '}
      <div className="one">
        Opservatorij krajobraza je interdisciplinarna platforma za
        istraživanje krajobraza i razvoj temeljen na krajobrazu. 2023.
        godine počeo je sa radom kao virtualni kolaborativni subjekt,
        a inicijalnu grupu čine stručnjaci različitih profila:
        <ul style={{ textDecoration: 'none' }}>
          <li>
            <p> dr.sc. Goran Andlar</p>{' '}
            <span>
              {' '}
              izvanredni profesor na Agronomskom fakultetu Sveučilišta
              u Zagrebu (UNIZG)
            </span>
          </li>
          <li>
            <p>dr.sc. Sanja Lončar</p>{' '}
            <span>
              izvanredna profesorica na Filozofskom fakultetu (UNIZG)
            </span>
          </li>
          <li>
            <p>dr.sc. Hrvoje Tomić</p>{' '}
            <span>
              izvanredni profesor na Agronomskom fakultetu (UNIZG)
            </span>
          </li>
          <li>
            <p>mag. art. Davor Konjikušić</p>{' '}
            <span>
              umjetnički asistent na Akademiji dramskih umjetnosti
              (UNIZG)
            </span>
          </li>
          <li>
            <p>dr.sc. Aleksandar Lukić</p>{' '}
            <span>
              redoviti profesor na Prirodoslovno-matematičkom
              fakultetu (UNIZG)
            </span>
          </li>
          <li>
            <p>dr.sc. Filip Šrajer</p>{' '}
            <span>
              prostorni planer i urbanist, osnivač tvrtke EKOMENA
              d.o.o.
            </span>
          </li>
          <li>
            <p>Damir Gamulin</p>{' '}
            <span>
              grafički dizajner, osnivač tvrtke Organizirano
              oblikovanje d.o.o.
            </span>
          </li>
        </ul>
      </div>
      <div className="two">
        <div style={{ position: 'relative' }}>
          {' '}
          <img
            src="about1.png"
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
              bottom: '0',
              left: '50%',
              width: '25vw',
              color: 'white',
              textAlign: 'left',
              fontSize: '60px',
              zIndex: '33',
            }}
          >
            Zašto je važan krajobraz?
          </div>
        </div>
        <div className="three">
          Koncept krajobraza zadnjih 30 ak godina dobiva značajan
          zamah na globalnoj razini. Smatra se važnim (1) elementom
          globalnog nasljeđa, (2) dobro je od javnog interesa, (3) te
          se smatra da može generirati regeneraciju, rast i oporavak
          zajednice. Koncept krajobraza nosi sa sobom priču o tome da
          sav prostor oko nas zaslužuje održivi razvoj, ne samo onaj
          zaštićeni. Koncept krajobraza se zapravo stvara kroz sve
          prisutniji kritiku sektorskom sagledavanju prostora, i
          strahu od neizvjesnosti što nam klimatske promjene nose i
          gubitku odnosa na relaciji čovjek – okoliš. Razumjeti danas
          krajobraz znači promatrati ga kroz različite prirodne,
          kulturno-povijesne, vizualne, materijalne i nematerijalne
          čimbenike. Primjenjivati krajobrazni pristup u nekom
          istraživanju, studiji, analizi znači pristupati prostoru
          integralno, dakle spajati znanja o različitim čimbenicima.
          Danas postoji niz metoda i alata koje nazivamo krajobraznim
          pristupom, prepoznati su na globalnoj razini, dio su
          paradigme održivog razvoja - ali imaju poteškoća sa ulaskom
          u sustav - u sektorske politike, zakonodavstvo. Zato se
          smatra da institucionalizacija tema krajobraza mora biti
          progresivna i znanstveno utemeljena.
        </div>
        <div className="four">
          <div style={{ position: 'relative' }}>
            {' '}
            <img
              src="about2.png"
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
                bottom: '0',
                left: '1vw',
                width: '25vw',
                color: 'white',
                textAlign: 'left',
                fontSize: '60px',
                zIndex: '33',
              }}
            >
              Čime se bavi Opservatorij?
            </div>
          </div>
        </div>
        <div className="five">
          {' '}
          Konvencija Vijeća Europe o krajobrazu opservatorijima
          krajobraza predviđa važnu ulogu u: 1) dokumentiranju i
          monitoringu krajobraza i čimbenika koji ga tvore, 2)
          omogućavanju razmjene podataka, 3) edukaciji šire javnosti
          4) eksperimentiranju interdisciplinarnim metodama i 5)
          povezivanju znanosti, lokalne zajednice i samouprave te
          tijela državne uprave. To znači da se ne radi samo
          opserviranju prostora - već se radi i opserviranju nad
          protokolima i politikama, odnosno monitoringu implementacije
          tema krajobraza. U Europi je sve više Opservatorija
          krajobraza, a najviše ih je u euromediteranskim regijama.
          Uspostavu Opservatorija krajobraza su kroz razne oblike
          suradnje podržali: Sveučilište u Zagrebu (angažman
          stručnjaka zaposlenih na Sveučilištu), Oxford Brookes
          University, UK (projekt EWAP
          Banovina/Banija-Pokuplje-Posavina), Srpsko narodno vijeće
          (projekt Opservatorij krajobraza Banovine/Banije), Republika
          Hrvatska, Ministarstvo kulture i medija (pokroviteljstvo).
        </div>
        <div className="six">
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
        </div>
        <Footer />{' '}
      </div>
    </div>
  );
}
