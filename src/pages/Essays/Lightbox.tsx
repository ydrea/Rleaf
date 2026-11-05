import { useEffect, useState } from 'react'

import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'

// Clicking any image inside a zoomable block opens it full-size in an overlay.
const ZOOMABLE = '.essay-gallery, .essay-maps, .essay-figure'

export const Lightbox = () => {
  const [img, setImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target instanceof HTMLImageElement &&
        target.closest(ZOOMABLE) &&
        !target.closest('.essay-pie')
      )
        setImg(target)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setImg(null)
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  if (!img) return null

  return (
    <div className='essay-lightbox' onClick={() => setImg(null)}>
      <ImageWithSuspense src={img.dataset.full ?? img.src} alt={img.alt} fallback={null} />
    </div>
  )
}
