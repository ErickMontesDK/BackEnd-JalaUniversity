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

  async read (id: number) {
    return await this.boxData.read(id)
  }

  async updateToTail (id: number, coords: number[]) {
    const defaultState: boxState = 'snake'
    const foundBox = await this.boxData.read(id)
    foundBox.coordX = coords[0]
    foundBox.coordY = coords[1]
    foundBox.state = defaultState
    return await this.boxData.updatePositionState(id, foundBox)
  }

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
