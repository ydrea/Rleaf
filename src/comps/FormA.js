import { useEffect, useState } from 'react';
import Message from './Message';
import './form.css';
import Modal from './Modal';

//
const FormA = ({ uploadedFile, exifR }) => {
  const [pod, podSet] = useState();
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //

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

  return (
    <div style={{ marginLeft: '30vw' }}>
      <button onClick={openModal}>Edit Metadata</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
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
              <option value="infrastruktura">Infrastruktura</option>
              <option value="ekologija">Ekologija</option>
              <option value="tradicijska_gradnja">
                Tradicijska gradnja
              </option>
              <option value="vjerski_objekti">Vjerski objekti</option>
              <option value="vazni_objekti">Važni objekti</option>
              <option value="spomenici">Spomenici</option>
              <option value="gospodarski_objekti">
                Gospodarski objekti
              </option>
              <option value="prirodni_resursi">
                Prirodni resursi
              </option>
              <option value="stanovnistvo">Stanovništvo</option>
              <option value="poljoprivreda">Poljoprivreda</option>
              <option value="stocarstvo">Stočarstvo</option>
              <option value="arhitektura">Arhitektura</option>
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
        {confirmationMsg && (
          <Message msg={confirmationMsg} type="confirmation" />
        )}{' '}
      </form>
    </div>
  );
};

export default FormA;
