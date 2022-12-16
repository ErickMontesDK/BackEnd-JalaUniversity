import Snake from '../../domain/entities/snake'
import { direction } from '../../domain/types/types'

export const movingInDirection = (SnakeFound:Snake, maxBoardValue:number): Snake => {
  const direction:direction = SnakeFound.direction
  const firstBox = 1

  switch (direction) {
    case 'up':
      SnakeFound.coordY = SnakeFound.coordY === maxBoardValue ? firstBox : SnakeFound.coordY + 1
      break
    case 'down':
      SnakeFound.coordY = SnakeFound.coordY === firstBox ? maxBoardValue : SnakeFound.coordY - 1
      break
    case 'left':
      SnakeFound.coordX = SnakeFound.coordX === firstBox ? maxBoardValue : SnakeFound.coordX - 1
      break
    case 'right':
      SnakeFound.coordX = SnakeFound.coordX === maxBoardValue ? firstBox : SnakeFound.coordX + 1
      break
  }
  return SnakeFound
}
