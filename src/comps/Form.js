import { useEffect, useState } from 'react';
import './form.css';
import Message from './Message';

//
const Form = ({ uploadedFile, exifR, id, signatura }) => {
  // const [pod, podSet] = useState();
  const [confirmationMsg, setConfirmationMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    // Extract only the fields you want to update
    const updatedFields = {
      naziv: e.currentTarget.naziv.value,
      naziv_eng: e.currentTarget.naziv_eng.value,
      opis: e.currentTarget.opis.value,
      opis_eng: e.currentTarget.opis_eng.value,
      lokacija: e.currentTarget.lokacija.value,
      datum: e.currentTarget.datum.value,
      kategorija: e.currentTarget.kategorija.value,
      autor: e.currentTarget.autor.value,

      copyright: e.currentTarget.copyright.value,
      copyright_holder: e.currentTarget.copyright_holder.value,
      tagovi: e.currentTarget.tagovi.value,
      DOI: e.currentTarget.DOI.value,
      // Add other fields as needed
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/patch/${signatura}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedFields),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log(res);
      if (res.status === 200) {
        setConfirmationMsg('Record successfully updated!');
      } else {
        console.error('Failed to update record');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    // currentTarget.reset();
    console.log('PRops', uploadedFile);
  }, [uploadedFile]);
  //
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '4vw',
      }}
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50vw',
        }}
      >
        <div className="form-control">
          <label>naziv</label>
          <input type="text" name="naziv" />
        </div>
        <div className="form-control">
          <label>naziv_eng</label>
          <input type="text" name="naziv_eng" />
        </div>
        <div className="form-control">
          <label>opis</label>
          <input type="text" name="opis" />
        </div>
        <div className="form-control">
          <label>opis_eng</label>
          <input type="text" name="opis_eng" />
        </div>
        <div className="form-control">
          <label>lokacija</label>
          <input
            type="text"
            name="lokacija"
            defaultValue={uploadedFile?.lokacija}
          />
        </div>{' '}
        <div className="form-control">
          <label>datum</label>
          <input
            type="text"
            name="datum"
            defaultValue={uploadedFile.datum_sni}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          width: '40vw',
          flexDirection: 'column',
        }}
      >
        <div className="form-control">
          <label>kategorija</label>
          <select name="kategorija">
            <option value="infrastruktura">infrastruktura</option>
            <option value="ekologija">ekologija</option>
            <option value="tradicijska_gradnja">
              tradicijska_gradnja
            </option>
            <option value="vjerski_objekti">vjerski objekti</option>
            <option value="vazni_objekti">važni objekti</option>
            <option value="spomenici">spomenici</option>
            <option value="gospodarski_objekti">
              gospodarski_objekti
            </option>
            <option value="prirodni_resursi">prirodni resursi</option>
            <option value="stanovnistvo">stanovništvo</option>
            <option value="poljoprivreda">poljoprivreda</option>
            <option value="stocarstvo">stočarstvo</option>
            <option value="arhitektura">arhitektura</option>
          </select>
        </div>{' '}
        <div className="form-control">
          <label>autor</label>
          <input
            type="text"
            name="autor"
            defaultValue={uploadedFile?.autor}
          />
        </div>
        <div className="form-control">
          <label>copyright</label>
          <input
            type="text"
            name="copyright"
            defaultValue={uploadedFile.copyright}
          />
        </div>
        <div className="form-control">
          <label>copyright_holder</label>
          <input
            type="text"
            name="copyright_holder"
            defaultValue={'Croatian Landscapes'}
          />
        </div>
        <div className="form-control">
          <label>tagovi</label>
          <input
            type="text"
            name="tagovi"
            defaultValue={JSON.stringify(uploadedFile?.tagovi)}
          />
        </div>
        <div className="form-control">
          <label>DOI</label>
          <input
            type="text"
            name="DOI"
            defaultValue="10.5281/zenodo.8174233"
          />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">SPREMI</button>
        </div>
      </div>
      {confirmationMsg && (
        <Message msg={confirmationMsg} type="confirmation" />
      )}{' '}
    </form>
  );
};

export default Form;
