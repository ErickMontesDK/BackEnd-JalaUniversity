import Board from '../entities/board'
import dbBoard from './entities/dbBoard'

export default class mapper {
  static toEntity (board: dbBoard) {
    const entityBoard: Board = new Board()
    entityBoard.id = board.id
    entityBoard.arregloX = board.arregloX
    entityBoard.arregloY = board.arregloY

    return entityBoard
  }
}
