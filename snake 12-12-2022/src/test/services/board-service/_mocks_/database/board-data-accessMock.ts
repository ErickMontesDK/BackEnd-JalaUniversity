import 'reflect-metadata'
import { injectable } from 'inversify'
import IBoardRepository from '../../../../../domain/repository/IBoardRepository'
import dbBoard from '../../../../../infrastructure/database/sqlite/entities/dbBoard'
import Board from '../../../../../domain/entities/board'

@injectable()
export class BoardDataMock implements IBoardRepository {
  private createMock: jest.Mock
  private readMock: jest.Mock
  private deleteMock: jest.Mock

  constructor () {
    this.createMock = jest.fn()
    this.readMock = jest.fn()
    this.deleteMock = jest.fn()
  }

  async create (board: dbBoard) {
    this.createMock(board)
    return { id: 1, message: 'mock return' }
  }

  async read (id: number) {
    this.readMock(id)
    const testBoard = new Board()
    testBoard.id = 1
    testBoard.arregloX = 5
    testBoard.arregloY = 5
    return testBoard
  }

  async delete (id: number) {
    this.deleteMock(id)
    return { id, message: 'mock message' }
  }
}
