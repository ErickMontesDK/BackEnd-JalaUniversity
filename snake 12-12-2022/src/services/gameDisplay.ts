import BoardService from './board-services'
import SnakeService from './snake-services'
import Snake from '../domain/entities/snake'

export default class GameDisplayFunctions {
  static async createBoardArrange (idBoard: number): Promise<string[][]> {
    const boardService = new BoardService()
    const boardDetail = await boardService.read(idBoard)
    const squarebox = '|__|'
    const board = []
    for (let i = 0; i < boardDetail.arregloY; i++) {
      const rows = []
      for (let j = 0; j < boardDetail.arregloY; j++) {
        rows.push(squarebox)
      }
      board.push(rows)
    }

    return board
  }

  static async addSnakesInDisplay (idSnakes:string[], board:string[][]): Promise<string[][]> {
    const snakeService = new SnakeService()
    console.log(idSnakes)
    const Snakes: Snake[] = []
    for (let i = 0; i < idSnakes.length; i++) {
      const snake = await snakeService.read(parseInt(idSnakes[i]))
      Snakes.push(snake)
      console.log(snake)
    }

    for (let i = 0; i < Snakes.length; i++) {
      const coordY = board.length - Snakes[i].coordY
      const coordX = Snakes[i].coordX - 1
      board[coordY][coordX] = '++'
    }
    return board
  }
}
