import React, { useState, useEffect } from 'react';
import Message from '../comps/Message';
import axios from 'axios';
import exifr from 'exifr';
import { useDispatch } from 'react-redux';
// import FormA from '../comps/FormA';
import PhotosEDIT from './PhotosEDIT';
import { getPhotos } from '../redux/rtk/gallerySlice';

import './Fileupload.css';

const delay = async (s = 1) => new Promise((resolve) => {
  setTimeout(resolve, s * 1000)
}) 

const getExifData = async (file) => {
  try {
    const data = await exifr.parse(file, { iptc: true, xmp: true });
    return data
  } catch (err) {
    console.error('Error parsing EXIF data:', err);
    return undefined
  }
};

const saveExif = async (signatura, exif = {}) => {
  try {
    await delay(Math.random() * 2 + 1)
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/novi`,
      {
        method: 'POST',
        body: JSON.stringify({
          signatura,
          lokacija: exif.Location ?? '',
          datum_sni: exif.DateCreated ?? '',
          autor: exif.Artist ?? '',
          copyright: exif.Copyright ?? '',
          tagovi: (Array.isArray(exif.subject) ? exif.subject : []).join(','),
          lon: `${exif.longitude ?? ''}`,
          lat: `${exif.latitude ?? ''}`,
          naziv: '',
          naziv_eng: '',
          opis: '',
          opis_eng: '',
          kategorija: '',
          copyright_holder: '',
          doi: '',
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (res.ok) {
      const data = await res.json()
      return {
        data,
      }
    }
    return {
      error: 'Error!'
    }
  } catch (err) {
    return {
      error: err?.msg ?? 'Error!',
    }
  }
}

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    await delay(Math.random() * 2 + 1)
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return {
      data,
    };
  } catch (err) {
    if (err.response && err.response.status === 500) {
      return {
        error: 'There was a problem with the server',
      };
    } else if (err.response) {
      return {
        error: err.response.data.msg,
      };
    }
    return {
      error: 'An error occurred while uploading the file'
    };
  }
}

export const Fileupload = () => {
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([]);
  const [uploadedFileList, setUploadedFileList] = useState([]);
  const [message, setMessage] = useState('');
  const [exifList, setExifList] = useState([]);
  const [savedExifList, setSavedExifList] = useState([]);

  const [isSaving, setIsSaving] = useState(false)
  const submitIsDisabled = fileList.length === 0 || isSaving

  const onChange = e => {
    const files = [...e.target.files]
    setFileList(files)
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (fileList.length === 0) {
      return
    }

    setIsSaving(true)
    setMessage('Saving...')

    // if (fileList.length === 1) {
    //   const { data, error } = await uploadFile(fileList[0])
    //   if (error) {
    //     setMessage(error)
    //     return
    //   }
    //   setUploadedFileList([data])
    //   setMessage(`Image File ${data.fileName} Uploaded to ${data.filePath}`);
    //   return
    // }

    const count = {
      files: fileList.length,
      uploads: 0,
      saves: 0,
    }
    await Promise.allSettled(fileList.map((file, fileIndex) => {
      return uploadFile(file).then((uploadFileData) => {
        if (uploadFileData.data) {
          count.uploads += 1
        }
        setUploadedFileList((currentUploadedFileList) => currentUploadedFileList.map((item, index) => {
          if (index !== fileIndex) {
            return item
          }
          return uploadFileData
        }))
        if (uploadFileData.data) {
          return saveExif(uploadFileData.data.fileName, exifList[fileIndex]).then((saveExifData) => {
            if (saveExifData.data) {
              count.saves += 1
            }
            setSavedExifList((currentSavedExifList) => currentSavedExifList.map((item, index) => {
              if (index !== fileIndex) {
                return item
              }
              return saveExifData
            }))
          })
        }
      })
    }))

    setMessage(`${count.saves}/${count.files} images saved.`);

    dispatch(getPhotos());
  };

  useEffect(() => {
    let isMounted = true
    const emptyList = fileList.map(() => undefined)
    setExifList(emptyList)
    setUploadedFileList(emptyList)
    setSavedExifList(emptyList)
    setIsSaving(false)
    setMessage('')

    const getExif = async () => {
      const exifData = await Promise.allSettled(fileList.map((file) => getExifData(file)))
      if (isMounted) {
        setExifList(exifData.map((result) => {
          if (result.status === 'fulfilled') {
            return result.value ?? undefined
          }
          return undefined
        }))
      }
    }
    getExif()

    return () => {
      isMounted = false
    }
  }, [fileList]);

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            multiple
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            Select files
          </label>
        </div>
        {fileList.length > 0 && (
          <ul>
            {fileList.map((file, fileIndex) => (
              <li key={file.name}>
                {isSaving ? (
                  <span>
                    Uploaded {uploadedFileList[fileIndex] ? uploadedFileList[fileIndex].data ? '🟢' : '🔴' : '⚪️'}
                    {' | '}
                    Saved {savedExifList[fileIndex] ? savedExifList[fileIndex].data ? '🟢' : '🔴' : '⚪️'}
                    {' | '}
                  </span>
                ) : null}
                {file.name}
              </li>
            ))}
          </ul>
        )}

        <input
          type="submit"
          value="Upload"
          disabled={submitIsDisabled}
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {/* {uploadedFileList.length === 1 && !!uploadedFileList[0] ? (
        <>
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center">{uploadedFileList[0].fileName}</h3>
              <img
                style={{ width: '60%' }}
                src={`${process.env.REACT_APP_SERVER_PUB}/${uploadedFileList[0].fileName}`}
                alt="dije"
              />
            </div>
          </div>
    
          <FormA uploadedFile={uploadedFileList[0]} exifR={exifList[0]} />
        </>
      ) : null} */}

      <PhotosEDIT />
    </>
  );
};
