import 'reflect-metadata'
import { injectable } from 'inversify'

import { testSnake } from './snakeMock'
import ISnakeRepository from '../../../../domain/repository/ISnakeRepository'
import dbSnake from '../../../../infrastructure/database/sqlite/entities/dbSnake'
import Snake from '../../../../domain/entities/snake'

@injectable()
export class SnakeDataMock implements ISnakeRepository {
  private createMock: jest.Mock
  private readMock: jest.Mock
  private readBestScoresMock: jest.Mock
  private updateMock: jest.Mock
  private deleteMock: jest.Mock

  constructor () {
    this.createMock = jest.fn()
    this.readMock = jest.fn()
    this.readBestScoresMock = jest.fn()
    this.updateMock = jest.fn()
    this.deleteMock = jest.fn()
  }

  async create (newSnake: dbSnake) {
    this.createMock(newSnake)
    return { id: 1, message: 'mock return' }
  }

  async read (id: number) {
    this.readMock(id)
    testSnake.id = id
    return testSnake
  }

  async readBestScores () {
    this.readBestScoresMock()
    return [testSnake, testSnake, testSnake, testSnake, testSnake]
  }

  async update (snake: Snake) {
    this.updateMock(snake)
    return snake
  }

  async delete (id: number) {
    this.deleteMock(id)
    return { id, message: 'mock response' }
  }
}
