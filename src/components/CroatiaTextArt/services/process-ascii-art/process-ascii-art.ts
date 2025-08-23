import asciiArtContent from '../../../../assets/croatia-ascii.txt?raw'
import { randomWordOffset } from '../random-word-offset/random-word-offset'

const DEFAULT_CHAR_SIZE = 13.5
const CHAR_WIDTH = 9.5
const CHAR_HEIGHT = 14
const WORD = 'OPSERVATORIJ '
const OFFSET_X = 230
const OFFSET_Y = 14

export type Character = {
  x: number
  y: number
  char: string
  size: number
}

type Props = {
  originalWord?: string
  spaceChance?: number
}

const lines = asciiArtContent.split('\n')

export const processAsciiArt = ({ originalWord = WORD, spaceChance = 0.1 }: Props = {}) => {
  const chars: Character[] = []
  let word = randomWordOffset(originalWord)
  let wordLength = word.length

  const processedLines: string[] = []

  for (const [index, line] of lines.entries()) {
    if (index % 100 === 0) {
      continue
    }

    word = randomWordOffset(originalWord)
    wordLength = word.length

    let newLine = ''
    let charACount = 0

    for (const [index, char] of line.split('').entries()) {
      if (index % 4 === 0) {
        continue
      }

      if (char === 'A') {
        if (Math.random() <= spaceChance) {
          newLine += ' '
        } else {
          const letterPos = charACount % wordLength
          const replacement = word[letterPos]
          newLine += replacement
        }

        charACount++

        if (charACount % wordLength === 0) {
          word = randomWordOffset(originalWord)
          wordLength = word.length
        }
      } else {
        newLine += char
      }
    }

    processedLines.push(newLine)
  }

  processedLines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char !== ' ') {
        chars.push({
          x: x * CHAR_WIDTH + OFFSET_X,
          y: y * CHAR_HEIGHT + OFFSET_Y,
          char: char,
          size: DEFAULT_CHAR_SIZE
        })
      }
    })
  })

  return chars
}
