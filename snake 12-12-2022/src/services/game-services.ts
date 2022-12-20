import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import IGameService from '../domain/repository/IGameService'
import Game from '../domain/entities/game'
import { gameState } from '../domain/types/types'
import IGameRepository from '../domain/repository/IGameRepository'
import GameDisplayFunctions from './gameDisplay'
import GameMechanics from './gameMechanics'
import BoxService from './box-service'
import BoardService from './board-services'

@injectable()
export default class GameService implements IGameService {
  gameData = container.get<IGameRepository>('GameData')

  async create (limitBoard: number, players:string, speed:number) {
    const defaultGameState:gameState = 'Ready to Start'
    const defaultId: number = 2
    const newGame = new Game()
    newGame.gameState = defaultGameState
    newGame.gameSpeed = speed
    newGame.idBoard = 3
    newGame.idSnakes = defaultId.toString()
    newGame.idFood = defaultId

    return await this.gameData.create(newGame)
  }

  async read (id: number) {
    return await this.gameData.read(id)
  }

  async displayBoardWithElements (id: number) {
    const patternForGame = await this.read(id)

    const boardId = patternForGame.idBoard
    const idFood = patternForGame.idFood

    const idSnakes:string[] = patternForGame.idSnakes.split(',')
    const AllSnakesData = await GameDisplayFunctions.returnAllSnakesInfo(idSnakes)

    const boardDisplay = await GameDisplayFunctions.createBoardArrange(boardId)
    const DisplayWithFood = await GameDisplayFunctions.addFoodInDisplay(idFood, boardDisplay)
    const DisplayWithSnakes = await GameDisplayFunctions.addSnakesInDisplay(AllSnakesData, DisplayWithFood)
    const DisplayWithSnakesBodys = await GameDisplayFunctions.addSnakesBodys(DisplayWithSnakes, AllSnakesData)

    console.log(DisplayWithSnakesBodys)

    const gameMechanics = new GameMechanics()
    gameMechanics.eatingFood(AllSnakesData, idFood, id)
    return DisplayWithSnakes
  }

  async updateFoodInGame (gameId: number) {
    const gameFound = await this.read(gameId)
    const boardService = new BoardService()
    const foodService = new BoxService()

    const boardSize = (await boardService.read(gameFound.idBoard)).arregloX
    const newFood = await foodService.create(boardSize)

    const updateGame = gameFound
    updateGame.idFood = newFood.id

    return await this.gameData.updateGame(updateGame)
  }
}
