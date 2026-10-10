import { Section } from '../Section/Section'
import logo from '../../assets/logo-inverted.svg'
import './Footer.sass'

export const Footer = () => (
  <Section dark className='footer' noReadMore>
    <img src={logo} alt='logo' />

    <a href='mailto:info@opservatorijkrajobraza.hr'>info@opservatorijkrajobraza.hr</a>

    <div className='year-tab'>2025</div>
  </Section>
)
