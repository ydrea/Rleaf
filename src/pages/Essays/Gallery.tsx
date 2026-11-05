import { useState, type ReactNode } from 'react'

import { ImageWithSuspense } from '../../components/ImageWithSuspense/ImageWithSuspense'
import '../Photos/Photos.sass'

// One gallery cell. Marks itself by orientation once the image is loaded, so portrait and
// landscape images can get different max heights.
export type GalleryPhoto = { src: string; thumb?: string }

// Pairs each full-size image from one glob with its thumbnail from another (same file name
// under a thumbs/ folder), sorted by file name.
export const withThumbs = (
  full: Record<string, string>,
  thumbs: Record<string, string>,
  prefix = ''
): GalleryPhoto[] =>
  Object.keys(full)
    .filter(key => key.split('/').pop()!.startsWith(prefix))
    .sort()
    .map(key => ({ src: full[key], thumb: thumbs[key.replace(/\/([^/]+)$/, '/thumbs/$1')] }))

// The grid shows the thumbnail; the lightbox reads the full image from data-full.
export const GalleryImage = ({
  src,
  thumb,
  alt,
  caption
}: GalleryPhoto & {
  alt: string
  caption?: ReactNode
}) => {
  const [orientation, orientationSet] = useState('')

  return (
    <figure className={`photo ${orientation}`}>
      <ImageWithSuspense
        src={thumb ?? src}
        data-full={src}
        alt={alt}
        onLoad={e =>
          orientationSet(
            e.currentTarget.naturalWidth > e.currentTarget.naturalHeight ? 'landscape' : 'portrait'
          )
        }
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

// The grid itself, styled like the Photos page (see .essay-gallery in Essays.sass).
export const GalleryGrid = ({
  children,
  className,
  style
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) => (
  <div className={`essay-gallery ${className ?? ''}`} style={style}>
    <div className='photos-container'>{children}</div>
  </div>
)
