import { useRef } from 'react'
import { useViewportSize, useThrottledValue } from '@mantine/hooks'

type Props = {
  width?: number
  blockSize?: number
}

export const useCanvasSizing = (props?: Props) => {
  const { width = window.innerWidth, blockSize = 1 } = props ?? {}

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const viewportSize = useViewportSize()
  const viewportWidth = useThrottledValue(viewportSize.width, 250)

  const desktop = viewportWidth > 640
  const blockWidth = blockRef.current?.getBoundingClientRect().width ?? 0
  const containerWidth = desktop ? Math.floor(blockWidth / blockSize) * blockSize + 1 : blockWidth
  const leftOffset = -(width - containerWidth) / 2
  const canvasLeft = desktop ? Math.round(leftOffset / blockSize) * blockSize : leftOffset

  const ctx = canvasRef.current?.getContext('2d')

  return {
    containerWidth,
    viewportWidth,
    canvasLeft,
    canvasRef,
    blockRef,
    ctx
  }
}
