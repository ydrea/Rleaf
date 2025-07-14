import { useRef, useEffect, useState } from 'react'
import type { MouseEvent, TouchEvent } from 'react'
import { useMotionValue, animate } from 'framer-motion'

import cameraSvg from '../../assets/camera.svg'
import fototeka from '../../assets/fototeka.jpg'
import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'

const BLOCK_SIZE = 125

type Props = {
  width?: number
  height?: number
}

const mousePositionToHex = (mousePositionX: number) => {
  const mousePositionXClamped = Math.max(0.3, Math.abs(mousePositionX))
  const mousePositionXClampedHex = Math.round(mousePositionXClamped * 255).toString(16)

  return mousePositionXClampedHex
}

export const CameraSubject = ({ width = 1251, height = 876 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cameraSvgRef = useRef<HTMLImageElement>(null)
  const [svgLoaded, setSvgLoaded] = useState(false)
  const { viewportWidth, containerWidth, canvasLeft, canvasRef, ctx, blockRef } = useCanvasSizing({
    width,
    blockSize: BLOCK_SIZE
  })

  const mousePositionX = useMotionValue(1)
  const mousePositionY = useMotionValue(1)
  const [animatedX, setAnimatedX] = useState(mousePositionX.get())
  const [animatedY, setAnimatedY] = useState(mousePositionY.get())

  useEffect(() => {
    const unsubscribeX = mousePositionX.on('change', setAnimatedX)
    const unsubscribeY = mousePositionY.on('change', setAnimatedY)

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mousePositionX, mousePositionY])

  useEffect(() => {
    if (!ctx) {
      return
    }

    const img = cameraSvgRef.current
    const x = animatedX
    const y = animatedY

    const fovRectWidth = 485
    const fovRectHeight = 477
    const focusSquareWidth = 75
    const focusSquareHeight = 40
    const focusSquareTop = 340

    ctx.translate(0.5, 0.5)

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 0.5
    ctx.strokeStyle = '#231F20'

    ctx.fillStyle = `#FFFFFF${mousePositionToHex(x)}`
    ctx.fillRect(0, 0, width, height)

    if (img) {
      ctx.drawImage(
        img,
        width / 2 - img.width / 2 + (x * containerWidth) / 2,
        height / 2 - img.height / 2 + BLOCK_SIZE + BLOCK_SIZE * y,
        img.width,
        img.height
      )
    }

    // vertical grid lines
    for (let x = 0; x < width; x += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // horizontal grid lines
    for (let y = 0; y < height; y += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // FOV
    {
      const fovRectX = width / 2 - fovRectWidth / 2
      const fovRectY = height / 2 - fovRectHeight / 2
      const fovRectX2 = fovRectX + fovRectWidth
      const fovRectY2 = fovRectY + fovRectHeight
      const focusSquareX =
        fovRectX + (fovRectWidth - focusSquareWidth) / 2 + (x * containerWidth) / 2
      const focusSquareY = fovRectY + focusSquareTop + BLOCK_SIZE * y
      const focusSquareX2 = focusSquareX + focusSquareWidth
      const focusSquareY2 = focusSquareY + focusSquareHeight

      // fov rectangle
      {
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.rect(fovRectX, fovRectY, fovRectWidth, fovRectHeight)
        ctx.stroke()

        // fov lines
        ctx.beginPath()
        ctx.moveTo(fovRectX, fovRectY)
        ctx.lineTo(focusSquareX, focusSquareY)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(fovRectX2, fovRectY)
        ctx.lineTo(focusSquareX2, focusSquareY)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(fovRectX, fovRectY2)
        ctx.lineTo(focusSquareX, focusSquareY2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(fovRectX2, fovRectY2)
        ctx.lineTo(focusSquareX2, focusSquareY2)
        ctx.stroke()
      }
    }

    ctx.translate(-0.5, -0.5)
  }, [
    width,
    height,
    containerWidth,
    animatedX,
    animatedY,
    viewportWidth,
    canvasLeft,
    ctx,
    svgLoaded
  ])

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
    const box = containerRef.current?.getBoundingClientRect()
    const { left, top, height: canvasH } = box ?? { height: height }

    if (left === undefined || top === undefined) {
      return
    }

    const xNorm = ((clientX - left) / containerWidth) * 2 - 1
    const yNorm = ((clientY - top) / canvasH) * 2 - 1

    animate(mousePositionX, xNorm, { type: 'tween', duration: 0.5, ease: 'backOut' })
    animate(mousePositionY, yNorm, { type: 'tween', duration: 0.5, ease: 'backOut' })
  }

  return (
    <div ref={blockRef} className='canvas-block'>
      <h1>fototeka</h1>
      <img
        ref={cameraSvgRef}
        src={cameraSvg}
        style={{ display: 'none' }}
        onLoad={() => setSvgLoaded(true)}
      />
      <div
        ref={containerRef}
        className='canvas-container'
        style={{ width: containerWidth, height }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ left: canvasLeft, width, height, backgroundImage: `url(${fototeka})` }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
        />
      </div>
    </div>
  )
}
