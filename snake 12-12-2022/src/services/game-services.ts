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
import SnakeService from './snake-services'

@injectable()
export default class GameService implements IGameService {
  protected gameData = container.get<IGameRepository>('GameData')
  protected boardService = new BoardService()
  protected snakeService = new SnakeService()
  protected boxService = new BoxService()

  async create (boardSize: number, players:string, speed:number) {
    const newBoardForThisGame = await this.boardService.create(boardSize)
    const newFoodForThisGame = await this.boxService.create(boardSize)
    const defaultGameState:gameState = 'Ready to Start'
    const playersForGame = players.split(',')
    let snakesForPlayersId = ''

    for (let i = 0; i < playersForGame.length; i++) {
      const newSnake = await this.snakeService.create(boardSize, playersForGame[i])

      snakesForPlayersId = i === 0 ? `${newSnake.id}` : snakesForPlayersId + `,${newSnake.id}`
    }

    const newGame = new Game()
    newGame.gameState = defaultGameState
    newGame.gameSpeed = speed
    newGame.idBoard = newBoardForThisGame.id
    newGame.idSnakes = snakesForPlayersId
    newGame.idFood = newFoodForThisGame.id

    return await this.gameData.create(newGame)
  }

  async read (id: number) {
    return await this.gameData.read(id)
  }

  async updateMovementFromAllElements (id: number) {
    const patternForGame = await this.read(id)
    const boardId = patternForGame.idBoard
    const idFood = patternForGame.idFood
    const idSnakes:string[] = patternForGame.idSnakes.split(',')

    const boardInGameDetails = await this.boardService.read(boardId)
    const foodInGameDetails = await this.boxService.read(idFood)
    const AllSnakesData = await GameMechanics.returnAllSnakesInfo(idSnakes)

    await GameMechanics.eatingFood(AllSnakesData, foodInGameDetails, id)
    const messageCollision = await GameMechanics.snakesCollide(AllSnakesData)

    return {
      boardInfo: boardInGameDetails,
      foodInfo: foodInGameDetails,
      snakesInfo: AllSnakesData,
      messageCollision
    }
  }

  async displayBoardWithElements (id: number) {
    const gameElementsInfo = await this.updateMovementFromAllElements(id)

    const boardDisplay = await GameDisplayFunctions.createBoardArrange(gameElementsInfo.boardInfo)
    const DisplayWithFood = await GameDisplayFunctions.addFoodInDisplay(gameElementsInfo.foodInfo, boardDisplay)
    const DisplayWithSnakes = await GameDisplayFunctions.addSnakesInDisplay(gameElementsInfo.snakesInfo, DisplayWithFood)
    const DisplayWithSnakesBodys = await GameDisplayFunctions.addSnakesBodys(DisplayWithSnakes, gameElementsInfo.snakesInfo)

    return [DisplayWithSnakesBodys, gameElementsInfo.messageCollision]
  }

  async updateFoodInGame (gameId: number) {
    const gameFound = await this.read(gameId)

    const boardSize = (await this.boardService.read(gameFound.idBoard)).arregloX
    const newFood = await this.boxService.create(boardSize)

    const updateGame = gameFound
    updateGame.idFood = newFood.id

    return await this.gameData.updateGame(updateGame)
  }
}
