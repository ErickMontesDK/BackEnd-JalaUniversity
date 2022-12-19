import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import IGameService from '../domain/repository/IGameService'
import Game from '../domain/entities/game'
import { gameState } from '../domain/types/types'
import IGameRepository from '../domain/repository/IGameRepository'
import dbGame from '../infrastructure/database/entities/dbGame'
import SnakeService from './snake-services'
import BoardService from './board-services'
import Snake from '../domain/entities/snake'
import BoxService from './box-service'
import Box from '../domain/entities/box'
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
    newGame.idBodySnake = defaultId.toString()
    newGame.idFood = defaultId

    return await this.gameData.create(newGame)
  }

  async read (id: number) {
    // const boxService = new BoxService()
    const patternForGame = await this.gameData.read(id)

    const boardId = patternForGame.idBoard
    const idSnakes:string[] = patternForGame.idSnakes.split(' ')

    const boardDisplay = await GameDisplayFunctions.createBoardArrange(boardId)
    const DisplayWithSnakes = await GameDisplayFunctions.addSnakesInDisplay(idSnakes, boardDisplay)
    console.log(DisplayWithSnakes)
    //
    // const idBodySnake = patternForGame.idBodySnake
    // const idFood = patternForGame.idFood

    // const foodDetail = await boxService.read(idFood)

    // const createDisplay = async ():Promise<any> => {
    //   const boardDisplay = await GameDisplayFunctions.createBoardArrange(boardId)

    //   const addingSnakeInDisplay = (coordFromSnake: number[]) => {
    //     for (let i = 0; i < boardDisplay.length; i++) {
    //       if (i === coordFromSnake[1] - 1) {
    //         const SnakeRow = boardDisplay[i]
    //         SnakeRow[coordFromSnake[0] - 1] = '|Ss|'
    //         boardDisplay[i] = SnakeRow
    //       }// } else {
    //       //   boardDisplay[i] = new Array(boardDetail.arregloX).fill(squareBox)
    //       // }
    //     }
    //   }
    //   const addingFoodInDisplay = (food: Box) => {
    //     for (let i = 0; i < boardDisplay.length; i++) {
    //       if (i === food.coordY - 1) {
    //         const row = boardDisplay[i]
    //         row[food.coordX - 1] = '|F|'
    //         boardDisplay[i] = row
    //       }
    //     }
    //   }

    //   for (let i = 0; i < Snakes.length; i++) {
    //     const coords = [Snakes[i].coordX, Snakes[i].coordY]
    //     headSnakes.push(coords)
    //   }

    //   for (let j = 0; j < headSnakes.length; j++) {
    //     addingSnakeInDisplay(headSnakes[j])
    //   }

    //   addingFoodInDisplay(foodDetail)
    // console.log(boardDisplay)
    // console.log(boardDisplay[0])
    // console.log(boardDisplay[0][0])
    // }
    // createDisplay()

    return patternForGame
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
