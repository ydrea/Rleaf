import { BlockWithStickyTitle } from '../../components/BlockWithStickyTitle/BlockWithStickyTitle'

export const About = () => {
  return (
    <BlockWithStickyTitle title='o nama'>
      <p>
        Opservatorij krajobraza je interdisciplinarna platforma za istraživanje krajobraza i razvoj
        temeljen na krajobrazu. Pokrenut 2023. godine kao virtualni kolaborativni subjekt, okuplja
        stručnjake iz različitih područja koji zajednički rade na projektima vezanim uz
        dokumentiranje, analizu i interpretaciju prostora.
      </p>
      <p>Inicijalnu grupu čine:</p>
      <ul>
        <li>
          dr. sc. Goran Andlar, izvanredni profesor, Sveučilište u Zagrebu – Agronomski fakultet
        </li>
        <li>
          dr. sc. Sanja Lončar, izvanredna profesorica, Sveučilište u Zagrebu – Filozofski fakultet
        </li>
        <li>
          dr. sc. Hrvoje Tomić, izvanredni profesor, Sveučilište u Zagrebu – Geodetski fakultet
        </li>
        <li>
          mag. art. Davor Konjikušić, umjetnički asistent, Sveučilište u Zagrebu – Akademija
          dramskih umjetnosti
        </li>
        <li>
          dr. sc. Aleksandar Lukić, redoviti profesor, Sveučilište u Zagrebu – Prirodoslovno-
          matematički fakultet
        </li>
        <li>dr. sc. Filip Šrajer, prostorni planer i urbanist, osnivač tvrtke EKOMENA d.o.o.</li>
        <li>
          Damir Gamulin, dizajner i istraživač, suosnivač tvrtke Organizirano oblikovanje d.o.o.
        </li>
      </ul>
      <p>
        Za dodatne informacije ili suradnju:{' '}
        <a href='mailto:info@croatianlandscape.hr'>info@croatianlandscape.hr</a>
      </p>
      <p>
        Više o pristupu i djelovanju potražite u rubrici{' '}
        <a href='/o-nama'>Opservatorij krajobraza</a>.
      </p>
    </BlockWithStickyTitle>
  )
}
