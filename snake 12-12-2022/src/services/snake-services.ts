import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import ISnakeService from '../domain/repository/ISnakeService'
import { randomPosition } from '../helpers/randomPosition'
import { direction } from '../domain/types/types'
import Snake from '../domain/entities/snake'
import ISnakeRepository from '../domain/repository/ISnakeRepository'
import translateToDirection from '../helpers/translateToDirection'

@injectable()
export default class SnakeService implements ISnakeService {
  snakeData = container.get<ISnakeRepository>('SnakeData')

  async create (limitBoard: number, player: string) {
    const x = randomPosition(limitBoard)
    const y = randomPosition(limitBoard)
    const initialLength = 1

    const directions:direction[] = ['up', 'down', 'left', 'right']
    const directionSnakeMove = directions[randomPosition(directions.length)]

    const newSnake = new Snake()
    newSnake.coordX = x
    newSnake.coordY = y
    newSnake.length = initialLength
    newSnake.user = player
    newSnake.direction = directionSnakeMove
    newSnake.tailNodes = '0'

    return await this.snakeData.create(newSnake)
  }

  async read (id: number) {
    return await this.snakeData.read(id)
  }

  async updateDirection (id: number, direction: string) {
    const fixedTypeDirection = translateToDirection(direction)
    if (fixedTypeDirection !== undefined) {
      return await this.snakeData.updateDirection(id, fixedTypeDirection)
    } else {
      throw new Error(`Unvalid direction sent: ${direction}`)
    }
  }

  async updateMovement (id: number, maxBoardValue:number) {
    if (isNaN(maxBoardValue) === false) {
      return await this.snakeData.startMoving(id, maxBoardValue)
    } else {
      throw new Error(`Unvalid limit value sent: ${maxBoardValue}`)
    }
  }

  async updateLength (id: number, node:string) {
    const nodeToNumber = parseInt(node)

    if (isNaN(nodeToNumber) === false) {
      const snakeToGrow = await this.snakeData.read(id)
      snakeToGrow.length++
      snakeToGrow.tailNodes = snakeToGrow.tailNodes + `,${node}`
      return await this.snakeData.growSnake(snakeToGrow)
    } else {
      throw new Error(`Unvalid node value sent: ${node}`)
    }
  }

  async delete (id: number) {
    return await this.snakeData.delete(id)
  }
}
