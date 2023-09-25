import React from 'react';
import Footer from '../../comps/Footer';
import './projects.css';
//
const Banija = () => {
  return (
    <div className="P">
      <div className="projects-container">
        <img src="/proj1.jpg" />

        <h1 style={{ color: 'white' }}>
          Opservatorij krajobraza Banovine/Banije
        </h1>
      </div>
      <div className="tekst">
        Opservatorij krajobraza Banovine/Banije je pilot projekt šireg
        programa Opservatorija, a njegova je svrha uspostava i
        diseminacija znanja, promicanje tema krajobraza kao što su
        naselja, zemljište, vode i šume te poticanje eksperimentalnih
        integralnih modela u krajobraznom planiranju i oblikovanju te
        gradnji. Cilj projekta jest dokumentirati i vrednovati ruralni
        i urbani prostor Banovine/Banije po načelu cjelovitosti i
        interdisciplinarnosti, što podrazumijeva uključivanje niza
        relevantnih profila stručnjaka te korištenje metoda temeljenih
        na interpretaciji i sintezi različitih čimbenika o prostoru,
        ekonomiji, demografiji, infrastrukturi, povijesti i okolišu.
        Inicijativa je odgovor na društveno-gospodarsko urušavanje
        Banije koje je doseglo kritičnu točku nakon potresa koji se
        desio u prosincu 2020. U tom smislu cilja se ka razotkrivanju
        potencijala krajobraza Banije te predlaganju razvojnih modela
        koji će snažno doprinijeti sveukupnoj društvenoj i ekonomskoj
        revitalizaciji regije. Inicijativa se temelji na zelenim i
        cjelovitim pristupima, a postiže ciljeve sljedećih EU
        politika: Teritorijalne agende 2030 (2020), Konvencije o
        europskim krajobrazima (2000.), Europskog zelenog plana
        (2021.), Izgradnja digitalne budućnosti Europe (2020), EU
        Strategije zelene infrastrukture (2013.) te Zajedničke
        poljoprivredne politike EU. Tijekom 2023. godine, projekt
        Opservatorija krajobraza Banovine/Banije podržali su Srpsko
        narodno vijeće i Ministarstvo kulture i medija RH.
      </div>

      <Footer style={{ position: 'absolute', bottom: '0' }} />
    </div>
  );
};

export default Banija;
