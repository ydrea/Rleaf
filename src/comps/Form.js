import { useEffect, useState } from 'react';

const Form = ({ uploadedFile, exifR }) => {
  const [pod, podSet] = useState();
  // const place = {
  //   lng: exifR.GPSLongitude[1],
  //   lat: exifR.GPSLatitude[1],
  // };
  // const asPoint = p => ({
  //   toPostgres: () =>
  //     pgp.as.format('ST_MakePoint(${lng}, ${lat})', p),
  //   rawType: true,
  // });
  //query
  // await db.oneOrNone(`SELECT * FROM table ORDER BY
  //             ST_StartPoint(geom) <-> ST_SetSRID($1, $2) LIMIT 1;`, [asPoint(place), 4326]);

  // //
  useEffect(() => {
    // podSet(formData);
  }, []);
  // //
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    const values = [...formData.values()];
    console.log('====================================');
    console.log(values);
    console.log('====================================');
    try {
      const res = await fetch('http://localhost:3500/novi', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    } catch (err) {
      console.error(err.msg, 'nece');
    }
    // clear inputs
    // e.currentTarget.reset();
  };
  //
  useEffect(() => {
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
            defaultValue={exifR.Sublocation}
          />
        </div>{' '}
        <div className="form-control">
          <label>datum</label>
          <input
            type="date"
            name="datum"
            defaultValue={Date.now().toString()}
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
          <select>
            <option name="infrastruktura">infrastruktura</option>
            <option name="ekologija">ekologija</option>
            <option name="tradicijska_gradnja">
              tradicijska_gradnja
            </option>
            <option name="vjerski_objekti">vjerski_objekti</option>
            <option name="vazni_objekti">važni_objekti</option>
            <option name="spomenici">spomenici</option>
            <option name="gospodarski_objekti">
              gospodarski_objekti
            </option>
            <option name="prirodni_resursi">prirodni_resursi</option>
            <option name="stanovnistvo">stanovništvo</option>
            <option name="poljoprivreda">poljoprivreda</option>
            <option name="stocarstvo">stočarstvo</option>
            <option name="arhitektura">arhitektura</option>
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
            defaultValue={exifR.Keywords}
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
            defaultValue={exifR.GPSLongitude[1]}
          />
        </div>
        <div className="form-control">
          <label>lat</label>
          <input
            type="text"
            name="lat"
            defaultValue={exifR.GPSLatitude[1]}
          />
        </div>
        {/* <div className="form-control">
          <label>url_image</label>
          <input type="text" name="url_image" defaultValue={``} />
        </div>
        <div className="form-control">
          <label>url_thumb</label>
          <input type="text" name="url_thumb" defaultValue={``} />
        </div> */}
        <div className="form-control">
          <label></label>
          <button type="submit">SPREMI</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
