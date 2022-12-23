import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import IGameService from '../domain/repository/IGameService'
import Game from '../domain/entities/game'
import { gameState } from '../domain/types/types'
import IGameRepository from '../domain/repository/IGameRepository'
import GameDisplayFunctions from './gameDisplay'
import GameMechanics from './gameMechanics'
import IBoxService from '../domain/repository/IBoxService'
import IBoardService from '../domain/repository/IBoardService'
import ISnakeService from '../domain/repository/ISnakeService'

@injectable()
export default class GameService implements IGameService {
  protected gameData: IGameRepository
  protected boardService: IBoardService
  protected snakeService: ISnakeService
  protected boxService: IBoxService
  protected gameMechanics: GameMechanics

  constructor (@inject('BoardService') board: IBoardService,
  @inject('SnakeService') snake:ISnakeService,
  @inject('BoxService') box:IBoxService,
  @inject('GameData') game: IGameRepository,
  @inject('GameMechanics') gameMechanics: GameMechanics) {
    this.boardService = board
    this.snakeService = snake
    this.boxService = box
    this.gameData = game
    this.gameMechanics = gameMechanics
  }

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

  async getAllDataForTheGame (id: number) {
    const patternForGame = await this.read(id)
    const gameState = patternForGame.gameState
    const boardId = patternForGame.idBoard
    const idFood = patternForGame.idFood
    const idSnakes:string[] = patternForGame.idSnakes.split(',')

    const boardInGameDetails = await this.boardService.read(boardId)
    const foodInGameDetails = await this.boxService.read(idFood)
    const AllSnakesData = await this.gameMechanics.returnAllSnakesInfo(idSnakes)
    const Scores = await this.gameMechanics.getScores(AllSnakesData)

    const DidSomeoneAte = await this.gameMechanics.eatingFood(AllSnakesData, foodInGameDetails)
    const DidSomeoneCrash = await this.gameMechanics.snakesCollide(AllSnakesData)

    if (DidSomeoneAte) {
      console.log('Someone earns 1 point')
      this.updateFoodInGame(id)
    }
    if (DidSomeoneCrash) this.stateGameEnded(id)

    const report = {
      boardInfo: boardInGameDetails,
      foodInfo: foodInGameDetails,
      snakesInfo: AllSnakesData,
      gameState,
      scores: Scores,
      DidSomeoneAte,
      DidSomeoneCrash
    }
    console.log(report)
    return report
  }

  async updateMovementFromAllElements (id: number) {
    const gameElementsInfo = await this.getAllDataForTheGame(id)

    await this.gameMechanics.updateMovementForAllSnakes(gameElementsInfo.snakesInfo, gameElementsInfo.boardInfo.arregloX)

    return gameElementsInfo
  }

  async displayBoardWithElements (id: number) {
    const gameElementsInfo = await this.updateMovementFromAllElements(id)

    const boardDisplay = await GameDisplayFunctions.createBoardArrange(gameElementsInfo.boardInfo)
    const DisplayWithFood = await GameDisplayFunctions.addFoodInDisplay(gameElementsInfo.foodInfo, boardDisplay)
    const DisplayWithSnakes = await GameDisplayFunctions.addSnakesInDisplay(gameElementsInfo.snakesInfo, DisplayWithFood)
    const DisplayWithSnakesBodys = await GameDisplayFunctions.addSnakesBodys(DisplayWithSnakes, gameElementsInfo.snakesInfo)

    const Scores = gameElementsInfo.scores
    const Display = [DisplayWithSnakesBodys, gameElementsInfo.gameState, Scores]

    return Display
  }

  async updateFoodInGame (gameId: number) {
    const gameFound = await this.read(gameId)

    const boardSize = (await this.boardService.read(gameFound.idBoard)).arregloX
    const newFood = await this.boxService.create(boardSize)

    const updateGame = gameFound
    updateGame.idFood = newFood.id

    return await this.gameData.updateGame(updateGame)
  }

  async stateGameRunning (gameId: number) {
    const gameFound = await this.read(gameId)
    gameFound.gameState = 'Playing'

    return await this.gameData.updateGame(gameFound)
  }

  async stateGameEnded (gameId: number) {
    const gameFound = await this.read(gameId)
    gameFound.gameState = 'Ended'

    return await this.gameData.updateGame(gameFound)
  }

  async runGameInLoopTillLose (gameId: number) {
    const gameParameters = await this.read(gameId)
    const gameSpeed = gameParameters.gameSpeed
    await this.stateGameRunning(gameId)

    const updateCycleGame = async () => {
      const display = await this.displayBoardWithElements(gameId)
      const gameState = await (await this.read(gameId)).gameState
      const endCondiction: gameState = 'Ended'
      console.log(display)
      console.log(gameState)
      if (gameState === endCondiction) {
        clearInterval(loopGameInterval)
      }
    }

    const loopGameInterval = setInterval(updateCycleGame, gameSpeed)
    return { id: gameId, message: `Game already running at one move per ${gameSpeed / 1000} seconds` }
  }

  async resetGame (gameId: number) {
    const gameElementsInfo = await this.getAllDataForTheGame(gameId)
    const gameInfo = await this.read(gameId)
    const snakes = gameElementsInfo.snakesInfo

    snakes.forEach(async (snake) => {
      await this.snakeService.resetInitialValues(snake.id, gameElementsInfo.boardInfo.arregloX)
    })
    gameInfo.gameState = 'Ready to Start'
    await this.gameData.updateGame(gameInfo)

    return { id: gameId, message: 'Game reset' }
  }
}
