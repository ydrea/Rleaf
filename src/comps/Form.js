import { useEffect, useState } from 'react';
import './form.css';
import Message from './Message';

//
const Form = ({ uploadedFile, exifR }) => {
  const [pod, podSet] = useState();
  const [confirmationMsg, setConfirmationMsg] = useState('');

  // // //
  // useEffect(() => {
  //   console.log(exifR);
  // }, [uploadedFile]);
  // // //

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData.entries().next().value);
    const data = Object.fromEntries(formData);

    // Handle exifR properties gracefully with default values
    const location = exifR ? exifR.Location : '';
    const dateCreated = exifR ? exifR.DateCreated : '';
    const artist = exifR ? exifR.Artist : '';
    const copyright = exifR ? exifR.Copyright : '';
    const subject = exifR ? JSON.stringify(exifR.subject) : '';
    const longitude = exifR ? exifR.longitude : '';
    const latitude = exifR ? exifR.latitude : '';

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/novi`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            lokacija: location,
            datum: dateCreated,
            autor: artist,
            copyright,
            tagovi: subject,
            lon: longitude,
            lat: latitude,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setConfirmationMsg('Record successfully submitted!');
    } catch (err) {
      console.error(err.msg, 'nece');
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
            <option value="vjerski_objekti">vjerski_objekti</option>
            <option value="vazni_objekti">važni_objekti</option>
            <option value="spomenici">spomenici</option>
            <option value="gospodarski_objekti">
              gospodarski_objekti
            </option>
            <option value="prirodni_resursi">prirodni_resursi</option>
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
