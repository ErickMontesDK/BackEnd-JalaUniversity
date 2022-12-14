import Snake from '../entities/snake'
import { direction } from '../types'

export const movingInDirection = (findedSnake:Snake): Snake => {
  const direction:direction = findedSnake.direction

  switch (direction) {
    case 'up':
      findedSnake.coordY++
      break
    case 'down':
      findedSnake.coordY--
      break
    case 'left':
      findedSnake.coordX--
      break
    case 'right':
      findedSnake.coordX++
      break
  }
  return findedSnake
}
