import React, { useState, useEffect } from 'react';
import Message from '../comps/Message';
import axios from 'axios';
import exifr from 'exifr';
import FormA from '../comps/FormA';
import './Fileupload.css';

export const Fileupload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [exifR, setExifR] = useState(null);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const { fileName, filePath } = res.data;
      console.log(fileName, filePath);
      const newUploadedFile = { fileName, filePath };
      setUploadedFile(newUploadedFile);
      setMessage(`Image File ${fileName} Uploaded to ${filePath}`);
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else if (err.response) {
        setMessage(err.response.data.msg);
      } else {
        setMessage('An error occurred while uploading the file');
      }
    }
  };

  const getExif = async () => {
    try {
      const exIf = await exifr.parse(file, { iptc: true, xmp: true });
      console.log(exIf);
      setExifR(exIf);
    } catch (err) {
      console.error('Error parsing EXIF data:', err);
    }
  };

  useEffect(() => {
    if (file) {
      getExif();
    }
  }, [file]);

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {uploadedFile.fileName && (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: '60%' }}
              src={uploadedFile.filePath}
              alt="dije"
            />
          </div>
        </div>
      )}

      {exifR && <FormA uploadedFile={uploadedFile} exifR={exifR} />}
    </>
  );
};
