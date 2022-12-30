import IBoardRepository from '../../../domain/repository/IBoardRepository'
import { injectable } from 'inversify'
import 'reflect-metadata'
import Board from '../../../domain/entities/board'
import BoardModel from './models/board-model'

@injectable()
export default class BoardData implements IBoardRepository {
  async create (board: Board) {
    if (board) {
      const newBoard = new BoardModel(board)
      const newBoardr = await newBoard.save()

      return { id: newBoardr.id.toString(), message: 'Board created' }
    } else {
      throw new Error('Board was not created')
    }
  }

  async read (id: string) {
    const boardFound = await BoardModel.findById(id)

    if (boardFound) {
      return boardFound
    } else {
      throw new Error('Board not found')
    }
  }

  async delete (id: string) {
    const fixedId = id.toString()
    const deleteResponse = await BoardModel.findByIdAndDelete(fixedId)

    if (deleteResponse) {
      return { id, message: 'Board deleted' }
    } else {
      throw new Error('Board not found')
    }
  }
}
