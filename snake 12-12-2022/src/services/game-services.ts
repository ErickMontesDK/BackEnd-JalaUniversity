import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import IGameService from '../domain/repository/IGameService'
import Game from '../domain/entities/game'
import { gameState } from '../domain/types/types'
import IGameRepository from '../domain/repository/IGameRepository'

@injectable()
export default class GameService implements IGameService {
  gameData = container.get<IGameRepository>('GameData')

  async create (limitBoard: number, players:string, speed:number) {
    const defaultGameState:gameState = 'Ready to Start'
    const defaultId: number = 1
    const newGame = new Game()
    newGame.gameState = defaultGameState
    newGame.gameSpeed = speed
    newGame.idBoard = defaultId
    newGame.idSnakes = defaultId.toString()
    newGame.idBodySnake = defaultId.toString()
    newGame.idFood = defaultId.toString()

    return await this.gameData.create(newGame)
  }

  // async read (id: number) {
  //   return await this.boxData.read(id)
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
