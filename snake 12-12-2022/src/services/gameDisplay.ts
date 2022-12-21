import Snake from '../domain/entities/snake'
import BoxService from './box-service'
import Board from '../domain/entities/board'
import Box from '../domain/entities/box'

export default class GameDisplayFunctions {
  static async createBoardArrange (boardInfo: Board): Promise<string[][]> {
    const squarebox = '|__|'
    const board = []

    for (let i = 0; i < boardInfo.arregloY; i++) {
      const rows = []
      for (let j = 0; j < boardInfo.arregloY; j++) {
        rows.push(squarebox)
      }
      board.push(rows)
    }

    return board
  }

  static async addFoodInDisplay (foodInfo:Box, board:string[][]): Promise<string[][]> {
    const initialValue = 1

    const coordY = board.length - foodInfo.coordY
    const coordX = foodInfo.coordX - initialValue
    board[coordY][coordX] = '|!!|'

    return board
  }

  static async addSnakesInDisplay (snakes:Snake[], board:string[][]): Promise<string[][]> {
    for (let i = 0; i < snakes.length; i++) {
      const coordY = board.length - snakes[i].coordY
      const coordX = snakes[i].coordX - 1

      board[coordY][coordX] = '|00|'
    }
    return board
  }

  static async addSnakesBodys (board:string[][], snakes:Snake[]): Promise<string[][]> {
    const boxService = new BoxService()
    const initialBoardValue = 1

    for (let i = 0; i < snakes.length; i++) {
      const tailElements = snakes[i].tailNodes.split(',')

      if (tailElements[0] !== '') {
        for (let j = 0; j < tailElements.length; j++) {
          const idNode = parseInt(tailElements[j])
          const Node = await boxService.read(idNode)

          const coordY = board.length - Node.coordY
          const coordX = Node.coordX - initialBoardValue

          board[coordY][coordX] = '|X|'
        }
      }
    }
    return board
  }
}
