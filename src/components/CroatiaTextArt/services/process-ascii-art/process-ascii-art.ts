import asciiArtContent from '../../../../assets/croatia-ascii.txt?raw';
import { randomWordOffset } from '../random-word-offset/random-word-offset';

const DEFAULT_CHAR_SIZE = 11;
const CHAR_WIDTH = 9;
const CHAR_HEIGHT = 14;
const WORD = 'OPSERVATORIJ ';

export type Character = {
  x: number;
  y: number;
  char: string;
  size: number;
};

type Props = {
  originalWord?: string;
  spaceChance?: number;
};

const lines = asciiArtContent.split('\n');

export const processAsciiArt = ({
  originalWord = WORD,
  spaceChance = 0.3,
}: Props = {}) => {
  const chars: Character[] = [];
  let word = randomWordOffset(originalWord);
  let wordLength = word.length;

  const processedLines: string[] = [];

  for (const line of lines) {
    word = randomWordOffset(originalWord);
    wordLength = word.length;

    let newLine = '';
    let charACount = 0;

    for (const char of line) {
      if (char === 'A') {
        if (Math.random() < spaceChance) {
          newLine += ' ';
        } else {
          const letterPos = charACount % wordLength;
          const replacement = word[letterPos];
          newLine += replacement;
        }

        charACount++;

        if (charACount % wordLength === 0) {
          word = randomWordOffset(originalWord);
          wordLength = word.length;
        }
      } else {
        newLine += char;
      }
    }

    processedLines.push(newLine);
  }

  processedLines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char !== ' ') {
        chars.push({
          x: x * CHAR_WIDTH,
          y: y * CHAR_HEIGHT,
          char: char,
          size: DEFAULT_CHAR_SIZE,
        });
      }
    });
  });

  return chars;
};
