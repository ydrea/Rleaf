import type { Photo } from '../../../../types/types'
import { decodeString } from '../decode-string/decode-string'
import { parseExifDate } from '../parse-exif-date/parse-exif-date'

export const saveExif = async (
  signatura: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exif: Record<string, any>
) => {
  try {
    const res = await fetch(`${import.meta.env.REACT_APP_SERVER}/novi`, {
      method: 'POST',
      body: JSON.stringify({
        signatura,
        lokacija: exif.Location ?? '',
        datum_sni: parseExifDate(exif.DateCreated),
        autor: exif.Artist ?? '',
        copyright: decodeString(exif.Copyright ?? exif.rights?.value ?? exif.CopyrightNotice ?? ''),
        tagovi: (Array.isArray(exif.subject) ? exif.subject.join(',') : exif.subject) ?? '',
        lon: `${exif.longitude ?? ''}`,
        lat: `${exif.latitude ?? ''}`,
        naziv: decodeString(
          exif.XPTitle || exif.Title || exif.title?.value || exif.ObjectName || ''
        ),
        naziv_eng: '',
        opis: decodeString(
          exif.XPSubject || exif.ImageDescription || exif.description?.value || exif.Caption || ''
        ),
        opis_eng: '',
        kategorija: '',
        copyright_holder: '',
        doi: ''
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      const data = (await res.json()) as Photo
      return {
        data
      }
    }
    return {
      error: 'Error!'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      error: err.msg ?? 'Error!'
    }
  }
}
