import { useEffect, useRef, useState } from 'react'

import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'

// Clicking any image inside a zoomable block opens it full-size in an overlay.
// Left/right arrows step through all zoomable images on the page, Escape closes.
const ZOOMABLE = '.essay-gallery, .essay-maps, .essay-figure'

const zoomableImages = () =>
  [...document.querySelectorAll<HTMLImageElement>(`:is(${ZOOMABLE}) img`)].filter(
    img => !img.closest('.essay-pie') && !img.closest('.essay-lightbox')
  )

export const Lightbox = () => {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const current = useRef(img)
  current.current = img

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
    const onKey = (e: KeyboardEvent) => {
      if (!current.current) return
      if (e.key === 'Escape') setImg(null)
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const all = zoomableImages()
        const index = all.indexOf(current.current)
        const step = e.key === 'ArrowRight' ? 1 : -1
        setImg(all[(index + step + all.length) % all.length] ?? null)
      }
    }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  if (!img) return null

  const src = img.dataset.full ?? img.src

  return (
    <div className='essay-lightbox' onClick={() => setImg(null)}>
      <ImageWithSuspense key={src} src={src} alt={img.alt} fallback={null} />
    </div>
  )
}
