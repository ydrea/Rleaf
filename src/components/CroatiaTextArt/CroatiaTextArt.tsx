import { useEffect, useRef, useState } from 'react'
import { useThrottledValue } from '@mantine/hooks'

import type { Character } from './services/process-ascii-art/process-ascii-art'
import { processAsciiArt } from './services/process-ascii-art/process-ascii-art'
import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'

type Props = {
  width?: number
  height?: number
}

export const CroatiaTextArt = ({ width = 1256, height = 879 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [isMouseMoving, setIsMouseMoving] = useState(0)
  const throttledValue = useThrottledValue(isMouseMoving, 100)
  const { viewportWidth, containerWidth, canvasLeft, canvasRef, ctx, blockRef } = useCanvasSizing({
    width
  })

  useEffect(() => {
    setCharacters(processAsciiArt())
  }, [throttledValue])

  useEffect(() => {
    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, width, height)

    characters.forEach((char) => {
      ctx.save()
      ctx.translate(char.x, char.y)
      ctx.font = `${char.size}px "DM Mono", monospace`
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(char.char, 0, 0)
      ctx.restore()
    })
  }, [characters, height, width, viewportWidth, ctx])

  const handleMouseMove = () => {
    setIsMouseMoving(isMouseMoving + 1)
  }

  return (
    <div ref={blockRef} className='canvas-block'>
      <h1>eseji</h1>
      <div
        ref={containerRef}
        className='canvas-container'
        style={{ width: containerWidth, height }}
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
