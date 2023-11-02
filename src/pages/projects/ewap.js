import React from 'react';
import Footer from '../../comps/Footer';
import Hline from '../../comps/Line';

const Ewap = () => {
  return (
    <div className="gallery">
      <div className="projects-container">
        <section>
          <img src="/projEWAP.jpeg" />
        </section>{' '}
      </div>
      <div className="tekst">
        <section>
          {' '}
          <p>
            {' '}
            Projekt EWAP: Ugrožena drvena arhitektura Banovine/Banije,
            Posavine i Pokuplja 2023-2024 dio je globalnog programa
            dokumentacije ugrožene drvene arhitekture kojeg provodi
            Oxford Brookes University iz Velike Britanije.
          </p>
          <p>
            {' '}
            Tim Opservatorija krajobraza, putem formalnog nositelja
            projekta: Društva Terra Banalis sa sjedištem u Glini,
            predložio je područje Banije, Posavine i Pokuplja na
            kojemu se nalazi najveća koncentracija povijesne drvene
            arhitekture u Hrvatskoj, koja je iz raznih razloga danas
            ugrožena.
          </p>
          Kroz osvojenu programsku podršku će se tijekom 2023. i 2024.
          godine digitalno dokumentirati značajan broj naseobina i
          pojedinačnih objekata, vještina, znanja i umijeća vezanih uz
          obradu drveta i gradnju građevina od drvata te obiteljskih i
          osobnih priča vlasnika i graditelja drvenih kuća. Više o
          projektu možete pročitati na{' '}
          <a
            href="https://terrabanalis.wixsite.com/terrabanalis/drvena-ba%C5%A1tina-sm%C5%BE"
            target="_blank"
            rel="noreferrer"
          >
            stranicama Društva Terra Banalis
          </a>
          , a na interaktivnoj karti na stranicama Opservatorija naći
          će se fotografije kuća, okućnica i naselja obrađivanih kroz
          projekt.
        </section>
        <div>
          <Hline color="#7e7e77" height="2px" width="100%" />{' '}
        </div>
      </div>
      <Footer style={{ position: 'absolute', bottom: '0' }} />{' '}
    </div>
  );
};

export default Ewap;
