import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import { randomPosition } from '../helpers/randomPosition'
import { boxState } from '../domain/types/types'
import Box from '../domain/entities/box'
import IBoxService from '../domain/repository/IBoxService'
import IBoxRepository from '../domain/repository/IBoxRepository'

@injectable()
export default class BoxService implements IBoxService {
  boxData = container.get<IBoxRepository>('BoxDataAcess')

  async create (limitBoard: number) {
    console.log(limitBoard)
    const x = randomPosition(limitBoard)
    const y = randomPosition(limitBoard)
    const defaultState: boxState = 'food'

    const newFood = new Box()
    newFood.coordX = x
    newFood.coordY = y
    newFood.state = defaultState
    newFood.TailNode = 0

    return await this.boxData.create(newFood)
  }

  // async read (id: number) {
  //   return await this.snakeData.read(id)
  // }

  // async updateDirection (id: number, direction: string) {
  //   const fixedTypeDirection = translateToDirection(direction)
  //   if (fixedTypeDirection !== undefined) {
  //     return await this.snakeData.updateDirection(id, fixedTypeDirection)
  //   } else {
  //     throw new Error(`Unvalid direction sent: ${direction}`)
  //   }
  // }

  // async updateMovement (id: number, maxBoardValue:number) {
  //   if (isNaN(maxBoardValue) === false) {
  //     return await this.snakeData.startMoving(id, maxBoardValue)
  //   } else {
  //     throw new Error(`Unvalid limit value sent: ${maxBoardValue}`)
  //   }
  // }

  // async delete (id: number) {
  //   return await this.snakeData.delete(id)
  // }
}
