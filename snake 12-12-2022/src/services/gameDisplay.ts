import BoardService from './board-services'
import SnakeService from './snake-services'
import Snake from '../domain/entities/snake'
import BoxService from './box-service'

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

  static async returnAllSnakesInfo (idSnakes:string[]):Promise<Snake[]> {
    const snakeService = new SnakeService()
    const Snakes: Snake[] = []
    for (let i = 0; i < idSnakes.length; i++) {
      const snake = await snakeService.read(parseInt(idSnakes[i]))
      Snakes.push(snake)
    }
    return Snakes
  }

  static async addSnakesInDisplay (snakes:Snake[], board:string[][]): Promise<string[][]> {
    for (let i = 0; i < snakes.length; i++) {
      const coordY = board.length - snakes[i].coordY
      const coordX = snakes[i].coordX - 1
      board[coordY][coordX] = '|++|'
    }
    return board
  }

  static async addFoodInDisplay (idFood:number, board:string[][]): Promise<string[][]> {
    const boxService = new BoxService()
    const foodInGame = await boxService.read(idFood)

    const coordY = board.length - foodInGame.coordY
    const coordX = foodInGame.coordX + 1
    board[coordY][coordX] = '|OO|'

    return board
  }

  static async addSnakesBodys (board:string[][], snakes:Snake[]): Promise<string[][]> {
    const boxService = new BoxService()

    for (let i = 0; i < snakes.length; i++) {
      const tailElements = snakes[i].tailNodes.split(',')

      for (let j = 1; j < tailElements.length; j++) {
        const idNode = parseInt(tailElements[j])
        const Node = await boxService.read(idNode)

        const coordY = board.length - Node.coordY - 1
        const coordX = Node.coordX

        board[coordY][coordX] = '|X|'
      }
    }
    return board
  }

  //   static async bodySnakes (idSnakes:string[], idBodySnake:string[]): Promise<string[][]> {
  //     const Snakes = [{ length: 3 }, { length: 2 }]

  //     for (let i = 0; i < Snakes.length; i++){
  //         idBodySnake.slice()
  //     }

//     for (let i = 0; i < idBodySnake.length; i++) {
//       const snake = await snakeService.read(parseInt(idSnakes[i]))
//       Snakes.push(snake)
//       console.log(snake)
//     }
//   }
}
