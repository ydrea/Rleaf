import { useState, useEffect } from 'react'

import { PhotosEdit } from '../PhotosEdit/PhotosEdit'
import { Message } from '../../components/Message/Message'
import { getPhotos } from '../../redux/rtk/gallerySlice'
import { useAppDispatch } from '../../redux/hooks'
import type { Photo } from '../../types/types'
import { getExifData } from './services/get-exif-data/get-exif-data'
import { saveExif } from './services/save-exif/save-exif'
import { uploadFile } from './services/upload-file/upload-file'
import './Upload.sass'

export const Fileupload = () => {
  const dispatch = useAppDispatch()

  const [fileList, setFileList] = useState<File[]>([])
  const [uploadedFileList, setUploadedFileList] = useState<Record<string, unknown>[]>([])
  const [message, setMessage] = useState('')
  const [exifList, setExifList] = useState<Record<string, unknown>[]>([])
  const [savedExifList, setSavedExifList] = useState<
    {
      data?: Photo
      error?: string
    }[]
  >([])

  const [isSaving, setIsSaving] = useState(false)
  const submitIsDisabled = fileList.length === 0 || isSaving

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files ?? [])]
    setFileList(files)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (fileList.length === 0) {
      return
    }

    setIsSaving(true)
    setMessage('Saving...')

    const count = {
      files: fileList.length,
      uploads: 0,
      saves: 0
    }

    await Promise.allSettled(
      fileList.map((file, fileIndex) => {
        return uploadFile(file).then((uploadFileData) => {
          if (uploadFileData.data) {
            count.uploads += 1
          }
          setUploadedFileList((currentUploadedFileList) =>
            currentUploadedFileList.map((item, index) => {
              if (index !== fileIndex) {
                return item
              }
              return uploadFileData
            })
          )
          if (uploadFileData.data) {
            return saveExif(uploadFileData.data.fileName, exifList[fileIndex]).then(
              (saveExifData) => {
                if (saveExifData.data) {
                  count.saves += 1
                }
                setSavedExifList((currentSavedExifList) =>
                  currentSavedExifList.map((item, index) => {
                    if (index !== fileIndex) {
                      return item
                    }
                    return saveExifData
                  })
                )
              }
            )
          }
        })
      })
    )

    setMessage(`${count.saves}/${count.files} images saved.`)

    dispatch(getPhotos())
  }

  const handleRemove = async (photo: Photo) => {
    setMessage('')
    const photoLabel = `id: ${photo.id}${photo.signatura ? ` (${photo.signatura})` : ''}`
    if (photo) {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}/photos/${photo.id}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          setMessage(`Record ${photoLabel} successfully deleted!`)
          dispatch(getPhotos())
          return true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err.msg, 'nece')
      }
    }
    return false
  }

  useEffect(() => {
    let isMounted = true
    const emptyList = fileList.map(() => ({}))
    setExifList(emptyList)
    setUploadedFileList(emptyList)
    setSavedExifList(emptyList)
    setIsSaving(false)
    setMessage('')

    const getExif = async () => {
      const exifData = await Promise.allSettled(fileList.map((file) => getExifData(file)))
      if (isMounted) {
        setExifList(
          exifData.map((result) => {
            if (result.status === 'fulfilled') {
              return result.value ?? undefined
            }
            return undefined
          })
        )
      }
    }
    getExif()

    return () => {
      isMounted = false
    }
  }, [fileList])

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form style={{ paddingTop: '15%', paddingLeft: '17.5%' }} onSubmit={onSubmit}>
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

      <PhotosEdit onRemove={handleRemove} />
    </>
  )
}
