import IBoardRepository from '../domain/repository/IBoardRepository'
import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import Board from '../domain/entities/board'
import IBoardService from '../domain/repository/IBoardService'

@injectable()
export default class BoardService implements IBoardService {
  boardData : IBoardRepository = container.get<IBoardRepository>('BoardData')

  async create (boardSize: number) {
    const size = boardSize

    const board = new Board()
    board.arregloX = size
    board.arregloY = size

    return await this.boardData.create(board)
  }

  async read (id: number) {
    return await this.boardData.read(id)
  }

  async delete (id: number) {
    return await this.boardData.delete(id)
  }
}
