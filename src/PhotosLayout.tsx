import { Outlet } from 'react-router-dom'

import { BlockWithStickyTitle } from './components/BlockWithStickyTitle/BlockWithStickyTitle'
import './pages/Photos/Photos.sass'

export const PhotosLayout = () => {
  return (
    <>
      <BlockWithStickyTitle
        title='fototeka'
        subtitleMargin='48px'
        subtitle='Dobrodošli u fototeku, odabrani fotografski arhiv koji kroz pretraživanje i klasifikaciju
          sadržaja omogućava različite vrste stručnih i znanstvenih usporedbi.'
      >
        <p>
          Kroz različite kategorije poput arhitekture, ekologije, gospodarstva, infrastrukture,
          poljoprivrede, prirodnih resursa, spomenika, stanovništva, stočarstva, a pogotovo kroz
          ključne riječi omogućeno je pretraživanje obimne fotografske građe kojom se mogu
          analizirati grupni i pojedinačni elementi unutar krajobraza, ali i sve društvene
          kontradikcije koje iz njega proizlaze.
        </p>
      </BlockWithStickyTitle>
      <Outlet />
    </>
  )
}
