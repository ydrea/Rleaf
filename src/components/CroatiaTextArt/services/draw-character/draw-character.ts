import type { Character } from '../process-ascii-art/process-ascii-art'

export const drawCharacter = (
  ctx: CanvasRenderingContext2D,
  char: Character,
  color = '#000000'
) => {
  ctx.save()
  ctx.translate(char.x, char.y)
  ctx.font = `normal 200 ${char.size}px Helvetica, Arial, system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.fillText(char.char, 0, 0)
  ctx.restore()
}
