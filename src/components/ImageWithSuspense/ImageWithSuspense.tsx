import type { ImgHTMLAttributes, ReactNode } from 'react'
import { forwardRef, Suspense } from 'react'

import { Loader } from '../Loader/Loader'
import { ImageResource } from './components/ImageResource/ImageResource'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string } & {
  fallback?: ReactNode
}

export const ImageWithSuspense = forwardRef<HTMLImageElement, Props>(
  ({ fallback, ...props }, ref) => (
    <Suspense fallback={fallback ?? <Loader />}>
      <ImageResource {...props} ref={ref} />
    </Suspense>
  )
)
