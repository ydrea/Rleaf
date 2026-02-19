import { useEffect, useRef, useState } from 'react'

import { useWindowWidth } from '../use-window-width/use-window-width'

type Props = {
  width?: number
  blockSize?: number
  blockSizeMultiplier?: number
  extraContainerWidth?: number
}

export const useCanvasSizing = (props?: Props) => {
  const {
    width = window.innerWidth,
    blockSize = 1,
    blockSizeMultiplier = 1,
    extraContainerWidth = 0
  } = props ?? {}
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWidth()
  const [canvasLeft, setCanvasLeft] = useState(0)
  const [blockWidth, setBlockWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const ctx = canvasRef.current?.getContext('2d')
  const blSize = blockSize * blockSizeMultiplier
  const desktop = windowWidth > 640

  useEffect(() => {
    const bloWidth = blockRef.current?.getBoundingClientRect().width ?? 0
    const contWidth = desktop
      ? Math.floor(bloWidth / blSize) * blSize + extraContainerWidth
      : bloWidth
    const widthDiff = -(width - contWidth) / 2
    const leftOffset = contWidth < width ? Math.floor(widthDiff / blSize) * blSize : widthDiff

    setBlockWidth(bloWidth)
    setContainerWidth(contWidth - (contWidth > bloWidth ? extraContainerWidth : 0))
    setCanvasLeft(leftOffset)
  }, [blockSize, blSize, desktop, width, windowWidth, extraContainerWidth])

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
