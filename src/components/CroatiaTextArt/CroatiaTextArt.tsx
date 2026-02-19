import { useEffect, useState } from 'react'
import { useThrottledState } from '@mantine/hooks'

import type { Character } from './services/process-ascii-art/process-ascii-art'
import { processAsciiArt } from './services/process-ascii-art/process-ascii-art'
import { useCanvasSizing } from '../../services/use-canvas-sizing/use-canvas-sizing'
import { getCharacterGrid } from './services/get-character-grid/get-character-grid'
import { drawCharacterBackground } from './services/draw-character-background/draw-character-background'
import { drawCharacter } from './services/draw-character/draw-character'

type Props = {
  width?: number
  height?: number
}

export const CroatiaTextArt = ({ width = 1496, height = 896 }: Props) => {
  const [characters, setCharacters] = useState<Record<string, Character[]>>({})
  const [isMouseMoving, setIsMouseMoving] = useThrottledState(0, 100)
  const { windowWidth, containerWidth, canvasLeft, canvasRef, ctx, blockRef } = useCanvasSizing({
    width
  })

  useEffect(() => {
    const asciiArt = processAsciiArt()
    const grid = getCharacterGrid({ width, height })
    setCharacters({ grid, asciiArt })
  }, [height, isMouseMoving, width])

  useEffect(() => {
    if (!ctx) {
      return
    }

    ctx.clearRect(0, 0, width, height)

    characters.grid.forEach((char) => {
      drawCharacter(ctx, char)
    })

    characters.asciiArt.forEach((char) => {
      drawCharacterBackground(ctx, char)
    })

    characters.asciiArt.forEach((char) => {
      drawCharacter(ctx, char)
    })
  }, [characters, height, width, windowWidth, ctx])

  const handleMouseMove = () => {
    setIsMouseMoving(isMouseMoving + 1)
  }

  return (
    <div ref={blockRef} className='canvas-block'>
      <h1 style={{ left: (canvasLeft < 0 ? 0 : canvasLeft) + 75, top: 50 }}>eseji</h1>
      <div className='canvas-container' style={{ width: containerWidth, height }}>
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
