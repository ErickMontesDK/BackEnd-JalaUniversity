import 'reflect-metadata'
import { injectable } from 'inversify'
import testGame from './gameMock'
import IGameRepository from '../../../../../domain/repository/IGameRepository'
import dbGame from '../../../../../infrastructure/database/sqlite/entities/dbGame'
import Game from '../../../../../domain/entities/game'

@injectable()
export class GameDataMock implements IGameRepository {
  private createMock: jest.Mock
  private readMock: jest.Mock
  private updateGameMock: jest.Mock

  constructor () {
    this.createMock = jest.fn()
    this.readMock = jest.fn()
    this.updateGameMock = jest.fn()
  }

  async create (newGame: dbGame) {
    this.createMock(newGame)
    return { id: 1, message: 'mock return' }
  }

  async read (id: number) {
    this.readMock(id)
    testGame.id = id
    return testGame
  }

  async updateGame (game: Game) {
    this.updateGameMock(game)
    return game
  }
}
