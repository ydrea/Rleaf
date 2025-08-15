import type { Character } from '../process-ascii-art/process-ascii-art'

export const drawCharacterBackground = (
  ctx: CanvasRenderingContext2D,
  char: Character,
  color = '#FFFFFF'
) => {
  ctx.save()
  ctx.translate(char.x, char.y)
  ctx.fillStyle = color
  ctx.fillRect(-char.size, -char.size * 1.5, char.size * 3, char.size * 2)
  ctx.restore()
}
