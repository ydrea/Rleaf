import exifr from 'exifr'

export const getExifData = async (file: File) => {
  try {
    const data = await exifr.parse(file, { iptc: true, xmp: true })
    return data
  } catch (err) {
    console.error('Error parsing EXIF data:', err)
    return undefined
  }
}
