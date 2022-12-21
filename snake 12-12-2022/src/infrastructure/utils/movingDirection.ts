import Snake from '../../domain/entities/snake'
import { direction } from '../../domain/types/types'

export const movingInDirection = (SnakeFound:Snake, limitBoardValue:number): Snake => {
  const direction:direction = SnakeFound.direction
  const firstBox = 1

  switch (direction) {
    case 'up':
      SnakeFound.coordY = SnakeFound.coordY >= limitBoardValue ? firstBox : SnakeFound.coordY + 1
      break
    case 'down':
      SnakeFound.coordY = SnakeFound.coordY <= firstBox ? limitBoardValue : SnakeFound.coordY - 1
      break
    case 'left':
      SnakeFound.coordX = SnakeFound.coordX <= firstBox ? limitBoardValue : SnakeFound.coordX - 1
      break
    case 'right':
      SnakeFound.coordX = SnakeFound.coordX >= limitBoardValue ? firstBox : SnakeFound.coordX + 1
      break
  }
  return SnakeFound
}
