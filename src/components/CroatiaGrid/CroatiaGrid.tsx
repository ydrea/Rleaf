import { useRef, useEffect, useState } from 'react'
import type { MouseEvent, TouchEvent } from 'react'

import croatiaSvg from '../../assets/croatia.svg'
import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'

const BLOCK_SIZE = 38

type Props = {
  width?: number
  height?: number
}

export const CroatiaGrid = ({ width = 1256, height = 762 }: Props) => {
  const svgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePositionX, setMousePositionX] = useState(570)
  const [mousePositionY, setMousePositionY] = useState(266)
  const [svgLoaded, setSvgLoaded] = useState(false)
  const { windowWidth, containerWidth, canvasLeft, canvasRef, ctx, blockRef, blockWidth } =
    useCanvasSizing({
      width,
      blockSize: BLOCK_SIZE
    })

  useEffect(() => {
    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 0.5
    ctx.strokeStyle = '#000000'

    if (svgRef.current) {
      const img = svgRef.current
      ctx.drawImage(
        img,
        width / 2 - img.width / 2 + 25 - 38,
        height / 2 - img.height / 2 - 15 + 38,
        img.width,
        img.height
      )
    }

    ctx.translate(0.5, 0.5)

    // grid lines
    for (let x = 0; x < width; x += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += BLOCK_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    const onTargetBlock = mousePositionX === 570 && mousePositionY === 266

    // selected block
    ctx.strokeStyle = onTargetBlock ? '#FF0000' : '#000000'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.rect(mousePositionX + 1, mousePositionY + 1, BLOCK_SIZE * 2, BLOCK_SIZE * 2)
    ctx.stroke()

    ctx.translate(-0.5, -0.5)
  }, [width, height, mousePositionX, mousePositionY, windowWidth, ctx, svgLoaded])

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
    const { left, top } = canvasRef.current?.getBoundingClientRect() ?? {
      left: 0,
      top: 0
    }

    if (!left || !top) {
      return
    }

    // round the position values to the nearest grid block
    const x = Math.round((clientX - left - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE
    const y = Math.round((clientY - top - BLOCK_SIZE) / BLOCK_SIZE) * BLOCK_SIZE

    setMousePositionX(x)
    setMousePositionY(y)
  }

  return (
    <div ref={blockRef} className='canvas-block croatia-grid'>
      <h1 style={{ left: BLOCK_SIZE + (blockWidth - containerWidth) / 2 - 3 }}>karte</h1>
      <img
        ref={svgRef}
        src={croatiaSvg}
        style={{ display: 'none' }}
        onLoad={() => setSvgLoaded(true)}
      />
      <div
        ref={containerRef}
        className='canvas-container'
        style={{
          width: containerWidth,
          height
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ left: canvasLeft, width, height }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
        />
      </div>
    </div>
  )
}
