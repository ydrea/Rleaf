import type { Character } from '../process-ascii-art/process-ascii-art'

type Props = { width: number; height: number }

const GRID_HEIGHT = 32

export const getCharacterGrid = ({ width, height }: Props): Character[] => {
  const characters: Character[] = []
  const pattern = 'OPSERVATORIJ'
  const patternLength = pattern.length

  const lineHeight = height / GRID_HEIGHT

  const bigFontLines = new Set<number>()
  const middleFontLines = new Set<number>()
  const sparseLines = new Set<number>()

  while (bigFontLines.size < 7) {
    bigFontLines.add(Math.floor(Math.random() * GRID_HEIGHT))
  }

  while (middleFontLines.size < 7) {
    const line = Math.floor(Math.random() * GRID_HEIGHT)

    if (!bigFontLines.has(line)) {
      middleFontLines.add(line)
    }
  }

  while (sparseLines.size < 4) {
    const line = Math.floor(Math.random() * GRID_HEIGHT)

    if (!bigFontLines.has(line) && !middleFontLines.has(line)) {
      sparseLines.add(line)
    }
  }

  for (let lineIndex = 0; lineIndex < GRID_HEIGHT; lineIndex++) {
    const isBigFont = bigFontLines.has(lineIndex)
    const isMiddleFont = middleFontLines.has(lineIndex)
    const isSparse = sparseLines.has(lineIndex)

    const fontSize = isBigFont ? 11 : isMiddleFont ? 9 : 7.5

    const y = lineIndex * lineHeight + lineHeight / 2
    const startPatternIndex = Math.floor(Math.random() * patternLength)
    let patternIndex = startPatternIndex
    let x = 4

    while (x < width) {
      const char = pattern[patternIndex]
      const charSpacing = isBigFont ? 48 : isMiddleFont ? 48 : isSparse ? 48 : 24

      characters.push({ x, y, char, size: fontSize })

      x += charSpacing

      patternIndex = (patternIndex + 1) % patternLength

      if (patternIndex === 0) {
        x += isBigFont ? 72 : isMiddleFont ? 96 : 48
      }
    }
  }

  return characters
}
