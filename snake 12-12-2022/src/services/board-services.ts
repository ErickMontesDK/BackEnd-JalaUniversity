import BoardRepository from '../domain/repository/boardRepository'
import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import Board from '../domain/entities/board'
import boardService from '../domain/repository/boardService'

@injectable()
export default class BoardService implements boardService {
  boardData : BoardRepository = container.get<BoardRepository>('BoardData')

  async create (elements: string) {
    const number = parseInt(elements)
    const board = new Board()
    board.arregloX = number
    board.arregloY = number

    return await this.boardData.create(board)
  }

  async read (id: number) {
    return await this.boardData.read(id)
  }

  async delete (id: number) {
    return await this.boardData.delete(id)
  }
}
