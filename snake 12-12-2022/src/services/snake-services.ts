import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import snakeService from '../domain/repository/snakeService'
import { randomPosition } from '../domain/utils/randomPosition'
import { direction } from '../domain/types'
import Snake from '../domain/entities/snake'
import snakeRepository from '../domain/repository/snakeRepository'

@injectable()
export default class SnakeService implements snakeService {
  snakeData = container.get<snakeRepository>('SnakeData')

  async create (seed: number, player: string) {
    const user = player.toString()

    const x = randomPosition(seed)
    const y = randomPosition(seed)

    const directions:direction[] = ['up', 'down', 'left', 'right']
    const directionSnakeMove = directions[randomPosition(3)]

    const newSnake = new Snake()
    newSnake.coordX = x
    newSnake.coordY = y
    newSnake.length = 1
    newSnake.user = user
    newSnake.direction = directionSnakeMove

    return await this.snakeData.create(newSnake)
  }

  async updateDirection (id: number, direction: direction) {
    return await this.snakeData.updateDirection(id, direction)
  }

  async read (id: number) {
    return await this.snakeData.read(id)
  }

  async delete (id: number) {
    return await this.snakeData.delete(id)
  }
}
