import { Outlet } from 'react-router-dom';
import { Hline } from './components/Hline/Hline';
import './pages/Photos/Photos.css';
//
export const PhotosLayout = () => {
  return (
    <div className='gallery'>
      <section className='#'>
        <div className='naslov-container'>
          <h1>opservatorij</h1>
          <div className='line-div0' />
        </div>{' '}
        <div className='teka'>
          <div className='tekast'>
            {' '}
            Dobrodošli u fototeku, odabrani fotografski arhiv koji kroz
            pretraživanje i klasifikaciju sadržaja omogućava različite vrste
            stručnih i znanstvenih usporedbi. Kroz različite kategorije poput
            arhitekture, ekologije, gospodarstva, infrastrukture, poljoprivrede,
            prirodnih resursa, spomenika, stanovništva, stočarstva, a pogotovo
            kroz ključne riječi omogućeno je pretraživanje obimne fotografske
            građe kojom se mogu analizirati grupni i pojedinačni elementi unutar
            krajobraza, ali i sve društvene kontradikcije koje iz njega
            proizlaze.{' '}
          </div>
          {/* <div className="line-div1" />{' '} */}
        </div>
      </section>{' '}
      <section>
        <Hline color='#18aa00' height={1} width='100%' /> <Outlet />{' '}
        {/* This will render child routes */}
      </section>
      {/* <Footer /> */}
    </div>
  );
};
