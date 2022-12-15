import Board from '../../domain/entities/board'
import dbBoard from '../database/entities/dbBoard'

export default class mapper {
  static toEntity (board: dbBoard) {
    const entityBoard: Board = new Board()
    entityBoard.id = board.id
    entityBoard.arregloX = board.arregloX
    entityBoard.arregloY = board.arregloY

    return entityBoard
  }
}