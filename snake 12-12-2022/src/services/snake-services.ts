import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import ISnakeService from '../domain/repository/ISnakeService'
import { randomPosition } from './helpers/randomPosition'
import { direction } from '../domain/types/types'
import Snake from '../domain/entities/snake'
import ISnakeRepository from '../domain/repository/ISnakeRepository'
import translateToDirection from './helpers/translateToDirection'
import { movingInDirection } from '../infrastructure/utils/movingDirection'
import { tailNodesMovement } from './tailNodesMovement'

@injectable()
export default class SnakeService implements ISnakeService {
  protected snakeData: ISnakeRepository
  constructor (@inject('SnakeData') snake: ISnakeRepository) {
    this.snakeData = snake
  }

  async create (limitBoard: number, player: string) {
    const initialLength = 1
    const x = randomPosition(limitBoard) + initialLength
    const y = randomPosition(limitBoard) + initialLength

    const directions:direction[] = ['up', 'down', 'left', 'right']
    const directionSnakeMove = directions[randomPosition(directions.length)]

    const newSnake = new Snake()
    newSnake.coordX = x
    newSnake.coordY = y
    newSnake.length = initialLength
    newSnake.user = player
    newSnake.direction = directionSnakeMove
    newSnake.tailNodes = ''

    return await this.snakeData.create(newSnake)
  }

  async read (id: string) {
    return await this.snakeData.read(id)
  }

  async updateDirection (id: string, direction: string) {
    const fixedTypeDirection = translateToDirection(direction)
    const snakeToUpdate = await this.snakeData.read(id)

    if (fixedTypeDirection !== undefined) {
      snakeToUpdate.direction = fixedTypeDirection

      return await this.snakeData.update(snakeToUpdate)
    } else {
      throw new Error(`Unvalid direction sent: ${direction}`)
    }
  }

  async updateMovement (id: string, limitBoard:number) {
    const SnakeFound = await this.snakeData.read(id)

    if (isNaN(limitBoard) === false && SnakeFound) {
      const oldPositionHead = [SnakeFound.coordX, SnakeFound.coordY]
      const updateSnake = movingInDirection(SnakeFound, limitBoard)
      const tailNodes = updateSnake.tailNodes.split(',')

      tailNodesMovement(tailNodes, oldPositionHead)

      return await this.snakeData.update(updateSnake)
    } else {
      throw new Error(`Unvalid limit ot id value sent: ${limitBoard}, ${id}`)
    }
  }

  async updateLength (id: string, node:string) {
    const nodeToNumber = parseInt(node)
    const snakeToGrow = await this.snakeData.read(id)

    if (isNaN(nodeToNumber) === false) {
      snakeToGrow.length++

      snakeToGrow.tailNodes = snakeToGrow.tailNodes === '' ? `${node}` : snakeToGrow.tailNodes + `,${node}`

      return await this.snakeData.update(snakeToGrow)
    } else {
      throw new Error(`Unvalid node value sent: ${node}`)
    }
  }

  async resetInitialValues (id: string, boardSize: number) {
    const initialLength = 1
    const x = randomPosition(boardSize) + initialLength
    const y = randomPosition(boardSize) + initialLength

    const snakeFound = await this.read(id)
    snakeFound.length = 1
    snakeFound.tailNodes = ''
    snakeFound.coordX = x
    snakeFound.coordY = y

    return await this.snakeData.update(snakeFound)
  }

  async getBestScores () {
    const scores:{Player:string, Score:number}[] = []
    const snakesLength = await this.snakeData.readBestScores()

    snakesLength.forEach(snake => {
      const fixScoreParameter = 1
      const element = { Player: snake.user, Score: snake.length - fixScoreParameter }
      scores.push(element)
    })
    return scores
  }

  async delete (id: string) {
    return await this.snakeData.delete(id)
  }
}
