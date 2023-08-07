import { useEffect, useState } from 'react';

const Form = ({ uploadedFile, exifR }) => {
  const [pod, podSet] = useState();

  // //
  useEffect(() => {
    // podSet(formData);
  }, []);
  // //
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData.entries().next().value);
    const data = Object.fromEntries(formData);
    // console.log(data);
    const values = [...formData.values()];
    // console.log(values);
    try {
      const res = await fetch('http://localhost:3500/novi', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res);
      // e.currentTarget.reset();
      // TO_DO
      //window.location('/upload')
    } catch (err) {
      console.error(err.msg, 'nece');
    }
    // clear inputs
    // e.currentTarget.reset();
  };
  //
  useEffect(() => {
    // currentTarget.reset();
    console.log('PRops', uploadedFile, exifR);
  }, [uploadedFile]);
  //
  return (
    <form
      style={{ display: 'flex', flexDirection: 'row' }}
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 400,
        }}
      >
        <div className="form-control">
          <label>signatura</label>
          <input
            // formID="1"
            type="text"
            name="signatura"
            defaultValue={uploadedFile.fileName}
          />
        </div>
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
            defaultValue={exifR.Location}
          />
        </div>{' '}
        <div className="form-control">
          <label>datum</label>
          <input
            type="date"
            name="datum"
            defaultValue={exifR.DateCreated}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          width: 400,
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
            defaultValue={exifR.Artist}
          />
        </div>
        <div className="form-control">
          <label>copyright</label>
          <input
            type="text"
            name="copyright"
            defaultValue={exifR.Copyright}
          />
        </div>
        <div className="form-control">
          <label>copyright_holder</label>
          <input
            type="text"
            name="copyright_holder"
            defaultValue={'-'}
          />
        </div>
        <div className="form-control">
          <label>Tag-ovi</label>
          <input
            type="text"
            name="tagovi"
            defaultValue={exifR.subject}
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
          <label>lon</label>
          <input
            type="text"
            name="lon"
            defaultValue={exifR.longitude}
          />
        </div>
        <div className="form-control">
          <label>lat</label>
          <input
            type="text"
            name="lat"
            defaultValue={exifR.latitude}
          />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">SPREMI</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
