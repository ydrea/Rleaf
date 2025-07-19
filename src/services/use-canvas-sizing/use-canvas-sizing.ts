import { useRef } from 'react'

import { useWindowWidth } from '../use-window-width/use-window-width'

type Props = {
  width?: number
  blockSize?: number
  blockSizeMultiplier?: number
}

export const useCanvasSizing = (props?: Props) => {
  const { width = window.innerWidth, blockSize = 1, blockSizeMultiplier = 1 } = props ?? {}
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWidth()

  const blockSizeM = blockSize * blockSizeMultiplier

  const desktop = windowWidth > 640
  const blockWidth = blockRef.current?.getBoundingClientRect().width ?? 0
  const containerWidth = desktop ? Math.floor(blockWidth / blockSizeM) * blockSizeM + 1 : blockWidth
  const leftOffset = -(width - containerWidth) / 2
  const canvasLeft = desktop ? Math.round(leftOffset / blockSize) * blockSize : leftOffset

  const ctx = canvasRef.current?.getContext('2d')

  return {
    containerWidth,
    windowWidth,
    canvasLeft,
    canvasRef,
    blockWidth,
    blockRef,
    ctx
  }
}
