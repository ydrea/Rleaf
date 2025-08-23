import { useEffect, useRef, useState } from 'react'

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
  const [canvasLeft, setCanvasLeft] = useState(0)
  const [blockWidth, setBlockWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const windowWidth = useWindowWidth()

  const desktop = windowWidth > 640
  const blockSizeM = blockSize * blockSizeMultiplier

  useEffect(() => {
    const _blockWidth = blockRef.current?.getBoundingClientRect().width ?? 0
    const _containerWidth = desktop
      ? Math.floor(_blockWidth / blockSizeM) * blockSizeM + 1
      : _blockWidth
    const leftOffset = -(width - _containerWidth) / 2
    const _canvasLeft = desktop ? Math.round(leftOffset / blockSize) * blockSize : leftOffset

    setBlockWidth(_blockWidth)
    setContainerWidth(_containerWidth)
    setCanvasLeft(_canvasLeft)
  }, [blockSize, blockSizeM, desktop, width, windowWidth])

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
