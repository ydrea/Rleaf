import { useState, useEffect } from 'react';
import Message from '../../comps/Message';
import axios from 'axios';
import exifr from 'exifr';

import PhotosEDIT from '../PhotosEdit/PhotosEdit';
import { getPhotos } from '../../redux/rtk/gallerySlice';
import { useAppDispatch } from '../../redux/hooks';
import type { Photo } from '../../types/types';
import './Upload.css';

const decodeString = (value: string) => {
  try {
    return decodeURIComponent(escape(value));
  } catch (e) {
    //
  }
  return value;
};

const getExifData = async (file: File) => {
  try {
    const data = await exifr.parse(file, { iptc: true, xmp: true });
    return data;
  } catch (err) {
    console.error('Error parsing EXIF data:', err);
    return undefined;
  }
};

const parseExifDate = (value: string | number | undefined) => {
  if (!value) {
    return undefined;
  }
  if (typeof value === 'string' && value.length === 8) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
  try {
    var d = new Date(value);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  } catch (e) {
    return undefined;
  }
};

const saveExif = async (
  signatura: string,
  exif: Record<string, any>
): Promise<{ data?: Photo; error?: any }> => {
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/novi`, {
      method: 'POST',
      body: JSON.stringify({
        signatura,
        lokacija: exif.Location ?? '',
        datum_sni: parseExifDate(exif.DateCreated),
        autor: exif.Artist ?? '',
        copyright: decodeString(
          exif.Copyright ?? exif.rights?.value ?? exif.CopyrightNotice ?? ''
        ),
        tagovi:
          (Array.isArray(exif.subject)
            ? exif.subject.join(',')
            : exif.subject) ?? '',
        lon: `${exif.longitude ?? ''}`,
        lat: `${exif.latitude ?? ''}`,
        naziv: decodeString(
          exif.XPTitle ||
            exif.Title ||
            exif.title?.value ||
            exif.ObjectName ||
            ''
        ),
        naziv_eng: '',
        opis: decodeString(
          exif.XPSubject ||
            exif.ImageDescription ||
            exif.description?.value ||
            exif.Caption ||
            ''
        ),
        opis_eng: '',
        kategorija: '',
        copyright_holder: '',
        doi: '',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = (await res.json()) as Photo;
      return {
        data,
      };
    }
    return {
      error: 'Error!',
    };
  } catch (err: any) {
    return {
      error: 'msg' in err ? err.msg : 'Error!',
    };
  }
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
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
  } catch (err: any) {
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
      error: 'An error occurred while uploading the file',
    };
  }
};

export const Fileupload = () => {
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<File[]>([]);
  const [uploadedFileList, setUploadedFileList] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [exifList, setExifList] = useState<any[]>([]);
  const [savedExifList, setSavedExifList] = useState<
    {
      data?: Photo;
      error?: any;
    }[]
  >([]);

  const [isSaving, setIsSaving] = useState(false);
  const submitIsDisabled = fileList.length === 0 || isSaving;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files ?? [])];
    setFileList(files);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fileList.length === 0) {
      return;
    }

    setIsSaving(true);
    setMessage('Saving...');

    const count = {
      files: fileList.length,
      uploads: 0,
      saves: 0,
    };
    await Promise.allSettled(
      fileList.map((file, fileIndex) => {
        return uploadFile(file).then((uploadFileData) => {
          if (uploadFileData.data) {
            count.uploads += 1;
          }
          setUploadedFileList((currentUploadedFileList) =>
            currentUploadedFileList.map((item, index) => {
              if (index !== fileIndex) {
                return item;
              }
              return uploadFileData;
            })
          );
          if (uploadFileData.data) {
            return saveExif(
              uploadFileData.data.fileName,
              exifList[fileIndex]
            ).then((saveExifData) => {
              if (saveExifData.data) {
                count.saves += 1;
              }
              setSavedExifList((currentSavedExifList) =>
                currentSavedExifList.map((item, index) => {
                  if (index !== fileIndex) {
                    return item;
                  }
                  return saveExifData;
                })
              );
            });
          }
        });
      })
    );

    setMessage(`${count.saves}/${count.files} images saved.`);

    dispatch(getPhotos());
  };

  const handleRemove = async (photo: Photo) => {
    setMessage('');
    const photoLabel = `id: ${photo.id}${
      photo.signatura ? ` (${photo.signatura})` : ''
    }`;
    if (photo) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/photos/${photo.id}`,
          {
            method: 'DELETE',
          }
        );
        if (res.ok) {
          setMessage(`Record ${photoLabel} successfully deleted!`);
          dispatch(getPhotos());
          return true;
        }
      } catch (err: any) {
        console.error(err.msg, 'nece');
      }
    }
    return false;
  };

  useEffect(() => {
    let isMounted = true;
    const emptyList = fileList.map(() => ({}));
    setExifList(emptyList);
    setUploadedFileList(emptyList);
    setSavedExifList(emptyList);
    setIsSaving(false);
    setMessage('');

    const getExif = async () => {
      const exifData = await Promise.allSettled(
        fileList.map((file) => getExifData(file))
      );
      if (isMounted) {
        setExifList(
          exifData.map((result) => {
            if (result.status === 'fulfilled') {
              return result.value ?? undefined;
            }
            return undefined;
          })
        );
      }
    };
    getExif();

    return () => {
      isMounted = false;
    };
  }, [fileList]);

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form
        style={{ paddingTop: '15%', paddingLeft: '17.5%' }}
        onSubmit={onSubmit}
      >
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            multiple
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            Select files
          </label>
        </div>
        {fileList.length > 0 && (
          <ul>
            {fileList.map((file, fileIndex) => (
              <li key={file.name}>
                {isSaving ? (
                  <span>
                    Uploaded{' '}
                    {uploadedFileList[fileIndex]
                      ? uploadedFileList[fileIndex].data
                        ? '🟢'
                        : '🔴'
                      : '⚪️'}
                    {' | '}
                    Saved{' '}
                    {savedExifList[fileIndex]
                      ? savedExifList[fileIndex].data
                        ? '🟢'
                        : '🔴'
                      : '⚪️'}
                    {' | '}
                  </span>
                ) : null}
                {file.name}
              </li>
            ))}
          </ul>
        )}

        <input
          type='submit'
          value='Upload'
          disabled={submitIsDisabled}
          className='btn btn-primary btn-block mt-4'
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
      <PhotosEDIT onRemove={handleRemove} />
    </>
  );
};
