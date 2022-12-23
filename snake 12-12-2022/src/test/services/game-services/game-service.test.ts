import { Container } from 'inversify'
import IBoardService from '../../../domain/repository/IBoardService'
import IBoxService from '../../../domain/repository/IBoxService'
import ISnakeService from '../../../domain/repository/ISnakeService'
import BoardService from '../../../services/board-services'
import BoxService from '../../../services/box-service'
import GameService from '../../../services/game-services'
import SnakeService from '../../../services/snake-services'
import { gameState } from '../../../domain/types/types'
import GameMechanics from '../../../services/gameMechanics'
import { BoardDataMock } from './_mocks_/database/board-data-accessMock'
import { SnakeDataMock } from './_mocks_/database/snake-data-accessMock'
import { BoxDataMock } from './_mocks_/database/box-data-accessMock'
import { GameDataMock } from './_mocks_/database/game-data-accessMock'
import testBox from './_mocks_/database/boxMock'
import { testSnake } from './_mocks_/database/snakeMock'
import testGame from './_mocks_/database/gameMock'

describe('Unit test for game services', () => {
  let gameServices: GameService

  beforeAll(async () => {
    const container = new Container()
    container.bind<BoardDataMock>('BoardData').to(BoardDataMock)
    container.bind<IBoardService>('BoardService').to(BoardService)
    container.bind<SnakeDataMock>('SnakeData').to(SnakeDataMock)
    container.bind<ISnakeService>('SnakeService').to(SnakeService)
    container.bind<BoxDataMock>('BoxDataAcess').to(BoxDataMock)
    container.bind<IBoxService>('BoxService').to(BoxService)
    container.bind<GameMechanics>('GameMechanics').to(GameMechanics)

    container.bind<GameDataMock>('GameData').to(GameDataMock)
    container.bind<GameService>('GameService').to(GameService)

    gameServices = container.get<GameService>('GameService')
  })

  it('Should create a Game object', async () => {
    const boardSize = 10
    const player = 'Erick'
    const speed = 5000
    const returnedMessage = await gameServices.create(boardSize, player, speed)

    expect(typeof returnedMessage.id).toBe('number')
    expect(typeof returnedMessage.message).toBe('string')
  })
  it('Should return a Game object', async () => {
    const gameId = 5
    const gameTypes:gameState[] = ['Ended', 'Playing', 'Ready to Start']
    const returnedGame = await gameServices.read(gameId)

    expect(returnedGame.id).toBe(gameId)
    expect(typeof returnedGame.gameSpeed).toBe('number')
    expect(gameTypes).toContain(returnedGame.gameState)
    expect(typeof returnedGame.idBoard).toBe('number')
    expect(typeof returnedGame.idFood).toBe('number')
    expect(typeof returnedGame.idSnakes).toBe('string')
  })
  it('Should return the information for all the components in the game', async () => {
    const gameId = 5
    const dataFromTheGame = await gameServices.getAllDataForTheGame(gameId)

    expect(dataFromTheGame.boardInfo).toHaveProperty('arregloX')
    expect(dataFromTheGame.foodInfo).toBe(testBox)
    expect(dataFromTheGame.gameState).toBe('Ready to Start')
    expect(dataFromTheGame.snakesInfo).toContain(testSnake)
  })
  it('Should update the food id in the game object', async () => {
    const gameId = 5
    const updatedFoodGame = await gameServices.updateFoodInGame(gameId)

    expect(updatedFoodGame.idFood).toBe(6)
  })
  it('Should update the game state to "Playing"', async () => {
    const gameId = 5
    const readyState = 'Ready to Start'
    testGame.gameState = readyState
    const updatedStateGame = await gameServices.stateGameRunning(gameId)

    expect(updatedStateGame.gameState).toBe('Playing')
    expect(updatedStateGame.gameState).not.toBe(readyState)
  })
  it('Should update the game state to "Ended"', async () => {
    const gameId = 5
    const readyState = 'Playing'
    testGame.gameState = readyState
    const updatedStateGame = await gameServices.stateGameEnded(gameId)

    expect(updatedStateGame.gameState).toBe('Ended')
    expect(updatedStateGame.gameState).not.toBe(readyState)
  })
  it('Should reset the game, changing to Ready to Play, sending a message', async () => {
    const gameId = 5
    const receivedMessage = await gameServices.resetGame(gameId)

    expect(receivedMessage.id).toBe(gameId)
    expect(receivedMessage.message).toBe('Game reset')
  })
})
