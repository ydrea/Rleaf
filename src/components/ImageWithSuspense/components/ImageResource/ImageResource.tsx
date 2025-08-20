import type { ImgHTMLAttributes } from 'react'
import { forwardRef, useEffect, useState } from 'react'

import { getImageResource } from '../../services/get-image-resource/get-image-resource'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string }

export const ImageResource = forwardRef<HTMLImageElement, Props>(({ src, ...rest }, ref) => {
  const [loaded, setLoaded] = useState(false)
  const resource = getImageResource(src)

  if (resource) {
    try {
      resource.read()
    } catch (promise) {
      if (promise instanceof Promise) {
        throw promise
      }
    }
  }

  useEffect(() => {
    setLoaded(false)
  }, [src])

  return (
    <img
      src={src}
      ref={ref}
      {...rest}
      onLoad={(e) => {
        rest.onLoad?.(e)
        setLoaded(true)
      }}
      className={loaded ? 'loaded' : 'loading'}
    />
  )
})
