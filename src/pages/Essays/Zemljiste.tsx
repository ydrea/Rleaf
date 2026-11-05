import udjeli from '../../assets/essays/zemljiste/udjeli.png'
import karta1 from '../../assets/essays/zemljiste/karta-1.png'
import karta2 from '../../assets/essays/zemljiste/karta-2.png'
import legenda from '../../assets/essays/zemljiste/legenda.png'
import mapa from '../../assets/essays/zemljiste/mapa.jpg'
import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'
import { Section } from '../../components/Section/Section'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import { Lightbox } from './Lightbox'
import './Essays.sass'

const kategorije = [
  [
    'Šume',
    'Zemljišta pod trajnom šumskom vegetacijom, uključujući visoke i guste sastojine, prirodne ili gospodarske.',
    '140686',
    '61'
  ],
  [
    'Šikare',
    'Zemljišta obrasla gustim grmljem, niskim drvećem i ranim sukcesijskim vrstama.',
    '17.734,9',
    '8'
  ],
  [
    'Zapuštene poljoprivredne površine',
    'Zemljišta na kojima je počeo proces napuštanja poljoprivrede ali su još uvijek vidljivi tragovi korištenja. Mogu obuhvaćati i aktivne poljoprivredne površine bilo koje kategorije, no često je prisutna početna sukcesija prema šikari.',
    '12898,5',
    '6'
  ],
  [
    'Mozaici poljoprivrednih površina',
    'Kombinacija različitih poljoprivrednih načina korištenja zemljišta. Može obuhvaćati vrtove, voćnjake, vinograde, oranice, livade, pašnjake, livade itd. ali i prirodnu vegetaciju koja omeđuje iste, npr. živice.',
    '20.004,2',
    '8'
  ],
  [
    'Travnjaci',
    'Otvorene površine prekrivene travnom vegetacijom, uključujući livade (košene), pašnjake (gdje pase stoka) i sukcesijske travnjake.',
    '25034,8',
    '7'
  ],
  [
    'Izgrađene površine s okućnicama',
    'Izgrađena područja uključujući pripadajuće otvorene prostore, uglavnom okućnice. U tom otvorenom prostoru moguće su različite namjene, dvorišta, vrtovi, voćnjaci itd.',
    '10442,1',
    '5'
  ],
  [
    'Vodene površine i vodena vegetacija',
    'Prirodna i umjetna vodna tijela (rijeke, potoci, jezera, lokve) te pripadajuća vegetacija.',
    '3430,3',
    '1'
  ]
]

const literatura = [
  'Andlar, G., Šteko, V., Hrdalo, I., Koščak Miočić-Stošić, V., Tomić Reljić, D., Krklec, K., Rubinić, V., Bogovac, L., Petrović, M., Meštrić, M., Garašić, D., Luić-Kmezić, K., Miholić, H., Bilić, S., Čačić, M., Keglević, S., Grgurić, Z., Mihulja, A., Vresnik, F., Šrajer, F., Kuzmanić, J., Šokec Plepelić, V., Suljić, A., Premužić Ančić, M., Naerlović, D., Lukić, A., Šišak, I., Večerin, S. (2024). Krajobrazna osnova Republike Hrvatske – Knjiga 3a: Čimbenici krajobraza. Ministarstvo prostornoga uređenja, graditeljstva i državne imovine, Zagreb',
  'EEA (2018). CLC 2018 technical guidelines. European Environment Agency. Dostupno na: https://www.eea.europa.eu',
  'HAOP (2016). Karta kopnenih nešumskih staništa Republike Hrvatske 2016. Hrvatska agencija za okoliš i prirodu. Dostupno na: https://www.haop.hr',
  'HAOP (2018). Nacionalna klasifikacija staništa Republike Hrvatske. Hrvatska agencija za okoliš i prirodu.',
  'HAZU (2021). Obnova poljoprivrede i ruralnog prostora na potresom pogođenom području Banovine. Razred za prirodne znanosti Hrvatske akademije znanosti i umjetnosti, Zagreb. Dostupno na: https://www.info.hazu.hr/wp-content/uploads/2021/09/Studija-Banovina_final.pdf',
  '(2000) Agroekološka studija i program razvitka poljoprivrede na području Sisačko-moslavačke županije. Sveučilište u Zagrebu, Agronomski fakultet',
  'Nacionalna infrastruktura prostornih podataka (NIPP). (2016). Građevinska područja – WFS. Dostupno na: https://registri.nipp.hr/izvori/view.php?id=246',
  'Prostorni plan uređenja Grada Petrinje. Zavod za prostorno uređenje Sisačko-moslavačke županije, 2005.',
  'Prostorni plan uređenja Općine Dvor. Zavod za prostorno uređenje Sisačko-moslavačke županije, 2011.'
]

export const Zemljiste = () => (
  <>
    <Lightbox />
    <BlockWithStickyTitle title='Poljoprivredno korištenje zemljišta na području Banije/Banovine danas'>
      <p>
        Obzirom na dostupnost GIS podataka, danas je ovaj izvor najlogičnije polazište za dobivanje
        informacija o zastupljenosti poljoprivrede u nekom području. Nekoliko je službenih izvora
        koji u idealnom slučaju mogu dati uvid u to stanje. Prvenstveno se ističe CORINE Land Cover
        (CLC) – europski sloj pokrova zemljišta izrađen metodom vizualne interpretacije satelitskih
        snimki. Za Hrvatsku su dostupna izdanja za 2000., 2006., 2012. i 2018. godinu, s prostornom
        rezolucijom od 100 metara, minimalnom kartiranom jedinicom od 25 ha i minimalnom širinom
        linearnog elementa od 100 m (EEA, 2018). Taj bi podatak u teoriji trebao biti iznimno
        koristan za interpretaciju poljoprivrednog korištenja zemljišta, no u praksi ima znatne
        manjkavosti – dijelom zbog metodologije i rezolucije, a još više zbog krivih tumačenja
        prilikom kartiranja. Dodatno, problem predstavlja i usitnjenost te zapuštenost velikog
        dijela hrvatskog poljoprivrednog zemljišta, što otežava tumačenje pojedinih kategorija.
      </p>
      <p>
        Za sve informacije vezane uz Opservatorij krajobraza, slobodno nas kontaktirajte putem
        e-maila na [<a href='mailto:info@croatianlandscape.hr'>info@croatianlandscape.hr</a>] ili
        telefonom na [<a href='tel:+385959123055'>+385 95 9123055</a>].
      </p>
    </BlockWithStickyTitle>

    <Section noReadMore>
      <p>
        Drugi izvor koji se pokazao korisnim, ponajprije zbog veće detaljnosti, jest Karta kopnenih
        nešumskih staništa Republike Hrvatske iz 2016. godine. Temelji se na Nacionalnoj
        klasifikaciji staništa i, iako prvenstveno ekološki orijentirana, uključuje niz stanišnih
        tipova koji obuhvaćaju i poljoprivredno korištenje zemljišta – poput mozaičnih površina,
        vinograda, voćnjaka, livada, pašnjaka, te u pojedinim slučajevima i vrtova unutar izgrađenih
        površina. Za razliku od CORINE-a koji se temelji na konceptu land cover/land use, staništa
        odražavaju određene vegetacijske, ekološke i ekosistemske značajke prostora. I ovaj podatak
        ima svoje manjkavosti, uključujući i pogrešne interpretacije prilikom kartiranja.
      </p>
      <p>
        Međutim, zbog veće detaljnosti i točnosti, podaci o staništima iz 2016. godine poslužili su
        u sklopu Opservatorija krajobraza kao temelj za analizu poljoprivrednog korištenja zemljišta
        na prostoru Banije/Banovine. Analiza je provedena reklasifikacijom izvornih tipova staništa
        prema autorski definiranim kategorijama koje bolje odražavaju korištenje zemljišta. Dodatno
        su također kartirane i korigirane određene teme, a posebice izgrađene površine koje su se na
        općoj razini doradile na temelju usporedbe s građevinskim područjima naselja područjima iz
        prostornog plana (NIPP, 2016). U konačnici, korištene su sljedeće kategorije način
        korištenja zemljišta, i njihovi udjeli:
      </p>
    </Section>

    <Section dark noReadMore thin>
      <table className='essay-table'>
        <thead>
          <tr>
            <th style={{ width: '33%' }}>Kategorija</th>
            <th style={{ width: '33%' }}>Objašnjenje</th>
            <th style={{ width: '17%' }}>Hektara</th>
            <th style={{ width: '17%' }}>%</th>
          </tr>
        </thead>
        <tbody>
          {kategorije.map(([naziv, opis, ha, udio]) => (
            <tr key={naziv}>
              <td>{naziv}</td>
              <td>{opis}</td>
              <td>{ha}</td>
              <td>{udio}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>UKUPNO</td>
            <td>.</td>
            <td>244265,61</td>
            <td>100%</td>
          </tr>
        </tfoot>
      </table>
    </Section>

    <figure className='essay-figure essay-pie'>
      <ImageWithSuspense
        src={udjeli}
        alt='Udjeli načina korištenja zemljišta na području Banije/Banovine'
      />
    </figure>

    <Section noReadMore style={{ borderTop: '1px solid #000', marginTop: 0, paddingTop: 96 }}>
      <p>
        Prema stanju iz 2016te, prirodna vegetacija izrazito dominira, i to šume sa 63%. Sve je
        prisutnija sukcesija prirodne vegetacije na nekadašnjim poljoprivrednim površinama, pa su
        prisutne šikare i to sa udjelom od 7%. Tom se mogu pridružiti u zapuštene poljoprivredne
        površine sa udjelom od 10% u kojima sukcesija prirodne vegetacije tek počinje, odnosno u
        kojima su još u manjem obimu prisutne određene poljoprivredne djelatnosti.{' '}
        <u>
          Radi se dakle o udjelu od skoro 80% površina koje nisu poljoprivredno iskorištene, odnosno
          koje su prepuštene prirodnim procesima.
        </u>{' '}
        Nasuprot, kada se zbroje mozaici poljoprivrednih površina (8%) te travnjaci koji po
        definiciji uglavnom ukazuju na ispašu ili na kosidbu za potrebe stočarstva (7%) dolazi se do
        ukupnog udjela od 15% ili oko 37.000 ha aktivnih poljoprivrednih površina. Taj broj bi se
        mogao i uvećati za pokoji postotak ukoliko bi se dodali vrtovi, voćnjaci i sl. površine
        unutar okućnica, a koje su ovdje kartirane pod izgrađenim površinama s okućnicama.
      </p>
      <p>
        Značenje ovog broja je lakše shvatiti ako se usporedi ili sa prošlim stanjem poljoprivrede
        ili s udjelom poljoprivrede u drugim hrvatskim krajobraznim regijama (Andlar i sur 2024.).
        Dok aktivne poljoprivredne površine danas zauzimaju tek oko 15% prostora Banije/Banovine, u
        krajobraznim regijama nizinske Panonsko-peripanonske Hrvatske one obuhvaćaju između 65 i 70%
        ukupne površine. Regije Jadranske Hrvatske, unatoč izraženijim ograničenjima za obradu
        zemljišta te jačanju turizma nauštrb poljoprivrede, u prosjeku imaju oko 55% udjela
        poljoprivrednih površina, što je također slučaj i s krajobraznim regijama{' '}
        <u>gorsko-brdske Panonsko-peripanonske makroregije</u>, kojoj pripada i sama
        Banija/Banovina. Usporedba jasno pokazuje da je Banovina iznimka i unutar vlastite
        makroregije, s višestruko nižim udjelom poljoprivrednog prostora, što potvrđuje opseg
        povlačenja čovjeka iz prostora i dominaciju prirodnih procesa sukcesije.
      </p>
    </Section>

    <Section noReadMore className='essay-section'>
      <figure className='essay-figure'>
        <div className='essay-maps'>
          <ImageWithSuspense
            src={karta1}
            alt='Primjer načina korištenja zemljišta – Martinovići, Veliki Gradac, Borojevići'
            loading='lazy'
          />
          <ImageWithSuspense
            src={karta2}
            alt='Primjer načina korištenja zemljišta – Ljeskovac'
            loading='lazy'
          />
          <ImageWithSuspense
            src={legenda}
            alt='Legenda: način korištenja zemljišta'
            loading='lazy'
          />
        </div>
      </figure>
    </Section>

    <Section>
      <p>
        Što se tiče usporedbe s recentnim periodima, do sada autori ovog teksta nisu došli do
        konkretnih podataka o stanju poljoprivrede pred raspad Jugoslavije. Može se tek indirektno
        zaključiti da je tada na ovim prostorima tada bilo oko 60% ukupnih površina aktivno
        poljoprivredno korišteno, s obzirom da su šume u to doba prekrivale otprilike 35% ukupne
        površine Banovine (Agroekološka studija SMŽ, 2000; HAZU, 2021). Primjerice, općina Dvor bila
        je najšumovitija s oko 45–50% površine pod šumom, dok su Petrinja i Glina imale znatno niže
        udjele, između 30 i 40% (Prostorni plan Petrinje, 2005; Prostorni plan Dvora, 2011). Ostatak
        površina – između 60 i 65% – činio je poljoprivredni prostor u širem smislu, uključujući
        oranice, travnjake, pašnjake i voćnjake.{' '}
        <u>
          U usporedbi sa stanjem iz 2016., kada je svega oko 15% prostora u aktivnoj poljoprivrednoj
          funkciji (na temelju kartiranja staništa), može se zaključiti da je u razdoblju od oko
          trideset godina došlo do višestrukog smanjenja poljoprivredne aktivnosti i progresivne
          sukcesije u smjeru šikara i šuma. Također, treba uzeti u obzir kako je ovo stanje 2016, te
          kako autori ovog teksta temeljem terenskih istraživanja koja se provode od 2019te smatraju
          kako se unazad 10 godina taj postotak možda i prepolovio. Trend napuštanja poljoprivrede,
          odnosno demografskog pada, izrazito je ubrzan zadnjih deset godina i nalazi se u kritičnoj
          točci nestajanja.
        </u>
      </p>
    </Section>

    <Section>
      <figure className='essay-figure'>
        <ImageWithSuspense src={mapa} loading='lazy' />
      </figure>
    </Section>

    <Section noReadMore className='essay-section essay-references' title='Popis literature'>
      <ul>
        {literatura.map(ref => (
          <li key={ref}>{ref}</li>
        ))}
      </ul>
    </Section>
  </>
)
