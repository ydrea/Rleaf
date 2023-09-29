import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Message from './Message';
import { getPhotos } from '../redux/rtk/gallerySlice';
import './form.css';

export const formatDateValue = (value) => {
  if (!value) {
    return ''
  }
  try {
    var d = new Date(value)
    return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
  } catch (e) {
    return ''
  }
}

//
const FormNOVI = ({ uploadedFile }) => {
  const dispatch = useDispatch();
  const [confirmationMsg, setConfirmationMsg] = useState('');

  const [form, setForm] = useState({
      signatura: uploadedFile.signatura ?? '',
      naziv: uploadedFile.naziv ?? '',
      naziv_eng: uploadedFile.naziv_eng ?? '',
      opis: uploadedFile.opis ?? '',
      opis_eng: uploadedFile.opis_eng ?? '',
      lokacija: uploadedFile.lokacija ?? '',
      datum_sni: uploadedFile.datum_sni ?? undefined,
      kategorija: uploadedFile.kategorija ?? '',
      autor: uploadedFile.autor ?? '',
      copyright: uploadedFile.copyright ?? '',
      copyright_holder: uploadedFile.copyright_holder ?? '',
      tagovi: uploadedFile.tagovi ?? '',
      doi: uploadedFile.doi ?? '',
      lon: uploadedFile.lon ?? '',
      lat: uploadedFile.lat ?? '',
  })

  const updateFormField = useCallback((key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }))
  }, [])

  const onChangeHandler = useCallback((e) => {
    const { name, type, value } = e.target
    let newValue = value
    if (type === 'date') {
      newValue = value || undefined
    }
    updateFormField(name, newValue)
    setConfirmationMsg('')
  }, [updateFormField])

  useEffect(() => {
    let isMounted = true
    const getCoordinates = async () => {
      try {
        const data = await fetch(`${process.env.REACT_APP_SERVER}/json_photos`).then((res) => res.json())
        const photo = data.find((item) => item.id === uploadedFile.id)
        const { coordinates: [lon, lat] } = JSON.parse(photo.geometry)
        if (isMounted) {
          setForm((currentForm) => ({
            ...currentForm,
            lon: `${lon}`,
            lat: `${lat}`,
          }))
        }
      } catch (e) {
        if (isMounted) {
          setForm((currentForm) => ({
            ...currentForm,
            lon: '',
            lat: '',
          }))
        }
      }
    }
    getCoordinates()
    return () => {
      isMounted = false
    }
  }, [uploadedFile])

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/update/${uploadedFile.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(form),
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.ok) {
        setConfirmationMsg('Record successfully submitted!');

        dispatch(getPhotos());
      }
    } catch (err) {
      console.error(err.msg, 'nece');
    }
  };

  return (
    <div style={{ marginLeft: '30vw' }}>
      <form
        style={{ display: 'flex', flexDirection: 'row', color: 'white' }}
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
              disabled
              value={form.signatura}
            />
          </div>
          <div className="form-control">
            <label>naziv</label>
            <input
              type="text"
              name="naziv"
              value={form.naziv}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>naziv_eng</label>
            <input
              type="text"
              name="naziv_eng"
              value={form.naziv_eng}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>opis</label>
            <input
              type="text"
              name="opis"
              value={form.opis}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>opis_eng</label>
            <input
              type="text"
              name="opis_eng"
              value={form.opis_eng}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>lokacija</label>
            <input
              type="text"
              name="lokacija"
              value={form.lokacija}
              onInput={onChangeHandler}
            />
          </div>{' '}
          <div className="form-control">
            <label>datum</label>
            <input
              type="date"
              name="datum_sni"
              value={formatDateValue(form.datum_sni)}
              onInput={onChangeHandler}
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
            <select
              name="kategorija"
              value={form.kategorija}
              onChange={onChangeHandler}
            >
              <option value="" disabled>Kategorija</option>
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
              <option value="prirodni_resursi">
                prirodni_resursi
              </option>
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
              value={form.autor}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>copyright</label>
            <input
              type="text"
              name="copyright"
              value={form.copyright}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>copyright_holder</label>
            <input
              type="text"
              name="copyright_holder"
              value={form.copyright_holder}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>Tag-ovi</label>
            <input
              type="text"
              name="tagovi"
              value={form.tagovi}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>DOI</label>
            <input
              type="text"
              name="doi"
              value={form.doi}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>lon</label>
            <input
              type="text"
              name="lon"
              value={form.lon}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>lat</label>
            <input
              type="text"
              name="lat"
              value={form.lat}
              onInput={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label></label>
            <button type="submit">SPREMI</button>
          </div>
        </div>
        {confirmationMsg && (
          <Message msg={confirmationMsg} type="confirmation" />
        )}
      </form>
    </div>
  );
};

export default FormNOVI;
