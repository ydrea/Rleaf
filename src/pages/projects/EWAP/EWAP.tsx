import ewap from '../../../assets/ewap.jpg'
import { BlockWithStickyTitle } from '../../../components/BlockWithStickyTitle/BlockWithStickyTitle'
import { ImageWithSuspense } from '../../../components/ImageWithSuspense/ImageWithSuspense'

export const Ewap = () => {
  return (
    <BlockWithStickyTitle
      title='Ugrožena drvena arhitektura Banovine / Banije (Projekt EWAP)'
      subtitle={<ImageWithSuspense src={ewap} alt='ewap' />}
      subtitleMargin='54px'
    >
      <p>
        Ugrožena drvena arhitektura Banovina/Banije, Posavine i Pokuplja 2023-2024 dio je globalnog
        programa dokumentacije ugrožene drvene arhitekture kojeg provodi Oxford Brookes University
        iz Velike Britanije.
      </p>
      <p>
        Tim Opservatorija krajobraza, putem formalnog nositelja projekta: Društva Terra Banalis sa
        sjedištem u Glini, predložio je područje Banije/Banovine, Posavine i Pokuplja na kojemu se
        nalazi najveća koncentracija povijesne drvene arhitekture u Hrvatskoj, koja je iz raznih
        razloga danas ugrožena.
      </p>
      <p>
        Kroz osvojenu programsku podršku će se tijekom 2023. i 2024. godine digitalno dokumentirati
        značajan broj naselja i pojedinačnih objekata, vještina, znanja i umijeća vezanih uz obradu
        drveta i gradnju građevina od drveta te obiteljskih i osobnih priča vlasnika i graditelja
        drvenih kuća.
      </p>
      <p>
        Više o projektu možete pročitati na{' '}
        <a
          href='https://terrabanalis.wixsite.com/terrabanalis/drvena-ba%C5%A1tina-sm%C5%BE'
          target='_blank'
          rel='noreferrer'
        >
          stranicama Društva Terra Banalis
        </a>
        , a pojedine izdvojene rezultate možete vidjeti i na stranicama Opservatorija krajobraza.
      </p>
    </BlockWithStickyTitle>
  )
}
