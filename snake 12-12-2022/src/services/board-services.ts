import IBoardRepository from '../domain/repository/IBoardRepository'
// import { container } from '../infrastructure/inversify/inversify.config'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import Board from '../domain/entities/board'
import IBoardService from '../domain/repository/IBoardService'

@injectable()
export default class BoardService implements IBoardService {
  // boardData : IBoardRepository = container.get<IBoardRepository>('BoardData')
  protected boardData: IBoardRepository
  constructor (@inject('BoardData') board: IBoardRepository) {
    this.boardData = board
  }

  async create (boardSize: number) {
    const size = boardSize

    const board = new Board()
    board.arregloX = size
    board.arregloY = size

    return await this.boardData.create(board)
  }

  async read (id: string) {
    return await this.boardData.read(id)
  }

  async delete (id: string) {
    return await this.boardData.delete(id)
  }
}
