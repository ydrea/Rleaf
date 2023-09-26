import React, { useState, useEffect } from 'react';
import Message from '../comps/Message';
// import Progress from '../comps/Progress';
import axios from 'axios';
import exifr from 'exifr';
import Photos from './Photos';
import PhotosEDIT from './PhotosEDIT';

//
export const Upload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [exifR, exifRSet] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);

  //

  //
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  //onSubmit
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
          //progress
        }
      );
      // Clear percentage
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage(`img File ${fileName} Uploaded 2 ${filePath}`);
      setFileUploaded(true);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      // setUploadPercentage(0);
    }
  };

  //exifr
  const getExif = async () => {
    try {
      const exIf = await exifr.parse(file, { iptc: true, xmp: true });
      console.log(exIf);
      exifRSet(exIf);
    } catch (error) {
      console.error('Error parsing EXIF data:', error);
      setMessage(
        'Error parsing EXIF data. Please check the file format.'
      );
    }
  };

  useEffect(() => {
    if (file) {
      getExif();
    }
  }, [file]);

  return (
    <>
      {/* <pre>{JSON.stringify(exifR, null, 2)}</pre>{' '} */}
      {message ? <Message msg={message} /> : null}
      <form
        onSubmit={onSubmit}
        style={{ marginTop: '30vh', marginLeft: '45vw' }}
      >
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

        {/* <Progress percentage={uploadPercentage} /> */}

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: '60%' }}
              src={uploadedFile.filePath}
              alt="nije"
            />
          </div>
        </div>
      ) : null}
      <PhotosEDIT />{' '}
    </>
  );
};
