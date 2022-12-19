import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import IGameService from '../domain/repository/IGameService'
import Game from '../domain/entities/game'
import { gameState } from '../domain/types/types'
import IGameRepository from '../domain/repository/IGameRepository'
import GameDisplayFunctions from './gameDisplay'

@injectable()
export default class GameService implements IGameService {
  gameData = container.get<IGameRepository>('GameData')

  async create (limitBoard: number, players:string, speed:number) {
    const defaultGameState:gameState = 'Ready to Start'
    const defaultId: number = 1
    const newGame = new Game()
    newGame.gameState = defaultGameState
    newGame.gameSpeed = speed
    newGame.idBoard = 3
    newGame.idSnakes = defaultId.toString()
    newGame.idBodySnake = '2 4 6'
    newGame.idFood = defaultId

    return await this.gameData.create(newGame)
  }

  async read (id: number) {
    // const boxService = new BoxService()
    const patternForGame = await this.gameData.read(id)

    const boardId = patternForGame.idBoard
    const idFood = patternForGame.idFood
    const idSnakes:string[] = patternForGame.idSnakes.split(',')

    const boardDisplay = await GameDisplayFunctions.createBoardArrange(boardId)
    const DisplayWithFood = await GameDisplayFunctions.addFoodInDisplay(idFood, boardDisplay)
    const DisplayWithSnakes = await GameDisplayFunctions.addSnakesInDisplay(idSnakes, DisplayWithFood)

    console.log(DisplayWithSnakes)
    return DisplayWithSnakes
  }

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
