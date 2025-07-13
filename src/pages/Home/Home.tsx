import { Section } from '../../components/Section/Section'
import { ThreeDScene } from '../../components/ThreeDScene/ThreeDScene'
import { CroatiaGrid } from '../../components/CroatiaGrid/CroatiaGrid'
import { CameraSubject } from '../../components/CameraSubject/CameraSubject'
import { CroatiaTextArt } from '../../components/CroatiaTextArt/CroatiaTextArt'
import { text1, text2, text3 } from '../../texts'
import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'

export const Home = () => {
  return (
    <>
      <BlockWithStickyTitle
        title='opservatorij krajobraza'
        subtitle='interdisciplinarna platforma posvećena istraživanju krajobraza i razvoju temeljenom na krajobrazu'
      >
        {text1}
      </BlockWithStickyTitle>

      <Section dark title='Zašto je važan krajobraz?'>
        <p>
          Koncept krajobraza posljednjih desetljeća dobiva sve veći globalni značaj. Smatra se
          ključnim dijelom globalne baštine, javnim dobrom od važnog interesa te potencijalnim
          pokretačem regeneracije, rasta i oporavka zajednica. Kroz ovu ideju, prepoznaje se da sav
          prostor, ne samo zaštićena područja, zaslužuje održiv razvoj.
        </p>

        <p>
          Koncept krajobraza razvija se kao odgovor na sve glasniju kritiku usko sektorskog
          promatranja prostora te zabrinutost zbog neizvjesnosti koje donose klimatske promjene i
          gubitak povezanosti između čovjeka i okoliša. Danas, razumijevanje krajobraza
          podrazumijeva holistički pristup koji u obzir uzima prirodne, kulturno-povijesne,
          vizualne, materijalne i nematerijalne aspekte.
        </p>

        <p>
          Primjena krajobraznog pristupa u istraživanjima, analizama i studijama znači pristupati
          prostoru integrirano, povezujući znanja iz različitih područja. Na globalnoj razini
          prepoznate su brojne metode i alati koji podupiru ovaj pristup, a koji su sastavni dio
          paradigme održivog razvoja. Međutim, unatoč njihovoj važnosti, suočavaju se s izazovima
          pri implementaciji u sektorske politike i zakonodavne okvire. Upravo zato pokrenut je
          Opservatorij krajobraza – eksperimentalna platforma koja istražuje i savjetuje tijela
          državne i lokalne uprave u pogledu implementacije krajobraznih tema.
        </p>
      </Section>

      <BlockWithStickyTitle title='opservatorij krajobraza Banovine / Banije' subtitle='projekt(i)'>
        {text2}
      </BlockWithStickyTitle>

      <BlockWithStickyTitle
        title='ugrožena drvena arhitektura Banovine / Banije (Projekt EWAP)'
        subtitle='projekt(i)'
      >
        {text3}
      </BlockWithStickyTitle>

      <CroatiaGrid />

      <Section>
        Kartografski prikazi u ovoj rubrici rezultat su istraživačkog rada Opservatorija krajobraza.
        Kroz mogućnost preklapanja tematskih slojeva, karte omogućuju bolje razumijevanje prostora i
        odnosa koji ga oblikuju. Dio sadržaja temelji se na postojećim izvorima, dok se drugi po
        prvi put kartira kroz terenski rad i suradnju s lokalnim dionicima. Obrađuju se i teme koje
        dosad nisu bile obuhvaćene kartama – specifična obilježja krajobraza, prostorni obrasci i
        procesi koji često ostaju nevidljivi u standardnim prikazima.
      </Section>

      <CameraSubject />

      <Section>
        Fototeka predstavlja mjesto vizualne interpretacije, opservacije i usporedbe. Naš
        fotografski arhiv kroz različite klasifikacije (kategorije i ključne riječi) omogućava
        objektivne i znanstvene usporedbe subjekata koji dijele slične vizualne karakteristike, ali
        omogućava i stvaranje odnosa između sadržaja koji naizgled nemaju direktnu vizualnu vezu.
        Stvaranjem fotografskih tipologija istraživačima omogućavamo pronalaženje specifičnih stavki
        unutar jasno definiranih kategorija.
      </Section>

      <ThreeDScene />

      <Section>
        Ova rubrika okuplja trodimenzionalne modele izrađene u sklopu projekata Opservatorija
        krajobraza. Modeli prikazuju pojedine objekte, prostorne cjeline i elemente krajobraza koji
        su važni za razumijevanje prostorne strukture, oblika i dinamike promjena. Sadržaj se
        temelji na fotogrametriji i drugim metodama dokumentacije, a postupno se proširuje u skladu
        s istraživačkim fokusima pojedinih projekata
      </Section>

      <CroatiaTextArt />

      <Section>
        U ovoj rubrici objavljujemo autorske tekstove nastale u okviru Opservatorija krajobraza.
        Riječ je o člancima i analizama koje se bave krajobrazima iz različitih perspektiva –
        prostorne, društvene, povijesne i ekonomske. Obuhvaćene teme uključuju vode, naselja, šume,
        poljoprivredu, degradirana područja, demografske promjene, lokalnu ekonomiju i druge procese
        koji oblikuju prostor. Tekstovi donose stručne uvide, opažanja s terena i kontekstualizaciju
        podataka prikupljenih kroz istraživanja.
      </Section>
    </>
  )
}
