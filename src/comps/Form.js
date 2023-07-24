import { useEffect } from 'react';

const Form = ({ uploadedFile, exifR }) => {
  //
  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const values = [...formData.values()];
    console.log(values);
    // //
    // const place = {
    //   lng: -122.2652671,
    //   lat: 47.30995661
    // };

    //const asPoint = p => ({
    //     toPostgres: () => pgp.as.format('ST_MakePoint(${lng}, ${lat})', p),
    //     rawType: true
    // });

    //query
    // await db.oneOrNone(`SELECT * FROM table ORDER BY
    //             ST_StartPoint(geom) <-> ST_SetSRID($1, $2) LIMIT 1;`, [asPoint(place), 4326]);

    const data = Object.fromEntries(formData);
    // do something
    console.log(data);

    // clear inputs
    e.currentTarget.reset();
  };
  //
  useEffect(() => {
    console.log('PRops', uploadedFile, exifR);
  }, [uploadedFile]);
  //
  return (
    <form
      style={{ display: 'flex', flexDirection: 'row' }}
      onSubmit={onSubmit}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 400,
        }}
      >
        {' '}
        <div className="form-control">
          <label>signatura</label>
          <input
            // formID="1"
            type="text"
            name="signatura"
            value={uploadedFile.fileName}
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
          <input type="text" name="lokacija" />
        </div>{' '}
        <div className="form-control">
          <label>datum</label>
          <input type="date" name="datum" />
        </div>
        <div className="form-control">
          <label>kategorija</label>
          <select>
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
            <option value="arhitektura">arhitektura</option>
          </select>
        </div>{' '}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="form-control">
          <label>autor</label>
          <input type="text" name="autor" />
        </div>
        <div className="form-control">
          <label>copyright</label>
          <input type="text" name="copyright" />
        </div>
        <div className="form-control">
          <label>copyright_holder</label>
          <input type="text" name="copyright_holder" />
        </div>
        <div className="form-control">
          <label>Tag-ovi</label>
          <input
            type="text"
            name="tagovi"
            value={JSON.stringify(uploadedFile)}
          />
        </div>
        <div className="form-control">
          <label>DOI</label>
          <input
            type="text"
            name="DOI"
            value="10.5281/zenodo.8174233"
          />
        </div>
        <div className="form-control">
          <label>point</label>
          <input
            type="text"
            name="point"
            defaultValue={
              exifR.GPSLongitude[1] + exifR.GPSLatitude[1]
            }
          />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">submit</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
