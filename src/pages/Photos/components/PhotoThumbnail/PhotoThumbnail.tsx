import type { Photo } from '../../../../types/types'

type Props = {
  photo: Photo
  index: number
  onClick: (index: number) => void
}

export const PhotoThumbnail = ({ photo, index, onClick }: Props) => {
  const handlePhotoClick = () => {
    onClick(index)
  }

  const { signatura, opis, lokacija, datum_sni, naziv } = photo

  const title = signatura.replace(/\.[^.]*$/, '')
  const date = new Date(datum_sni).toLocaleDateString('hr-HR')
  const photoData = [title, opis, lokacija, date].filter((text) => text && text.trim() !== '')

  return (
    <div key={photo.id} className='photo'>
      <img
        alt={naziv}
        onClick={handlePhotoClick}
        src={import.meta.env.VITE_SERVER_PUB + `/thumbs/${signatura}`}
      />
      <ul className='photo-data'>
        {photoData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
