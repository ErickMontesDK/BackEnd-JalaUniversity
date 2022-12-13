import Snake from '../../../domain/entities/snake'
import dbSnake from '../entities/dbSnake'

export default class mapper {
  static toEntity (snake: dbSnake) {
    const entitySnake: Snake = new Snake()
    entitySnake.id = snake.id

    entitySnake.coordX = snake.coordX

    entitySnake.coordY = snake.coordY

    entitySnake.length = snake.length

    entitySnake.user = snake.user

    entitySnake.direction = snake.direction

    return entitySnake
  }
}
