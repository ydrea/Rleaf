import './about.css';
export default function About() {
  return (
    <div className="about">
      <div className="one">
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
            fakultetu (UNIZG)
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
            dr.sc. Filip Šrajer, prostorni planer i urbanist, osnivač
            tvrtke EKOMENA d.o.o.
          </li>
          <li>
            Damir Gamulin, grafički dizajner, osnivač tvrtke
            Organizirano oblikovanje d.o.o.
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
              top: '20vh',
              color: 'white',
              textAlign: 'center',
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
          globalnog nasljeđa, (2) dobro je od javnog interesa, (3)
          očuvanje krajobraza važno je za stvaranje otpornosti
          zajednice (4) smatra se da može generirati regeneraciju,
          rast i oporavak zajednice. Koncept krajobraza nosi sa sobom
          priču o tome da sav prostor oko nas zaslužuje održivi
          razvoj, ne samo onaj zaštićeni. Koncept krajobraza se
          zapravo stvara kroz sve prisutniji kritiku sektorskom
          sagledavanju prostora, i zapravo strahu od neizvjesnosti što
          nam klimatske promjene nose i gubitku odnosa na relaciji
          čovjek – okoliš. Razumijeti danas krajobraz znači promatrati
          ga kroz različite prirodnih, kulturno-povijesnih, vizualnih,
          materijalnih i nematerijalnih čimbenika. Primjenjivati
          krajobrazni pristup u nekom istraživanju, studiji, analizi
          znači pristupati prostoru integralno, dakle spajati znanja o
          različitim čimbenicima. Danas postoji niz metoda i alata
          koje nazivamo krajobraznim pristupom, prepoznati su na
          globalnoj razini, dio su paradigme održivog razvoja - ali
          imaju poteškoća sa ulaskom u sustav - u sektorske politike,
          zakonodavstvo. Zato se smatra da institucionalizacija tema
          krajobraza mora biti progresivna i znanstveno utemeljena.
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
                top: '20vh',
                color: 'white',
                textAlign: 'center',
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
          Konvencija o europskim krajobrazima opservatorijima
          krajobraza predviđa važnu ulogu u: 1) dokumentiranju i
          monitoringu krajobraza i čimbenika koji ga tvore, 2)
          omogućavanju razmjene podataka, 3) edukaciji šire javnosti
          4) eskperimentiranju interdisciplinarnim metodama i 5)
          povezivanju znanosti, lokalne zajednice i samouprave te
          tijela državne uprave. To znači da se ne radi samo
          opserviranju prostora - već se radi i opserviranju nad
          protokolima i politikama - monitoring implementacije teme
          krajobraza. U Europi su opservatoriji krajobraza
          uspostavljeni i djeluju u poznatim mediteranskim ruralnim
          regijama: Toskani i Kataloniji. Uspostavu Opservatorija
          krajobraza su kroz razne oblike suradnje podržali:
          Sveučilište u Zagrebu (angažman stručnjaka zaposlenih na
          Sveučilištu), Oxford Brookes University, UK (projekt EWAP
          Banovina/Banija-Pokuplje-Posavina), Srpsko narodno vijeće
          (projekt Opservatorij krajobraza Banovine/Banije), Republika
          Hrvatska, Ministarstvo kulture i medija (pokroviteljstvo).
        </div>
        <div className="six">
          {' '}
          Za sve informacije vezane uz ‘Opservatorij krajobraza’,
          slobodno nas kontaktirajte putem e-maila na
          [info@croatianlandscape.hr] ili telefonom na [+385 xx xxx
          xxxx]. Zanima vas više o našem radu i misiji? Pretplatite se
          na naš newsletter i budite u tijeku s našim istraživanjima i
          aktivnostima. Unesite svoju e-mail adresu i pridružite se
          putovanju prema očuvanju i razumijevanju krajobraza.
        </div>
      </div>
    </div>
  );
}
