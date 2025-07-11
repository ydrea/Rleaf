import logo from '../../assets/logo.svg';
import './Footer.css';

export const Footer = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div className='footer' style={style}>
      <section>
        <div className='logo-container'>
          {' '}
          <img src={logo} alt='Logo' className='logo' />
          <p className='roll'>
            Opservatorij krajobraza, 2023.
            <br />
            Uvjeti korištenja: Sve fotografije i tekstovi objavljeni na ovom
            portalu podliježu CC BY-NC-SA 4.0 licenci. Ova licenca dopušta
            nekomercijalno umnožavanje, dijeljenje i mijenjanje, uz navođenje
            autorstva na način koji je specificirao autor i uz daljnje
            dijeljenje pod istim uvjetima. Obratite nam se ukoliko su vam
            potrebne fotografije u izvornoj veličini.
          </p>
        </div>
      </section>{' '}
    </div>
  );
};
