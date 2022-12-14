class Board {
  id!: number
  coordinates!: string[][]
}

const size = 10
const board = new Board()
board.id = 5
board.coordinates = new Array(size).fill(Array(size).fill(' '))

console.log(board)
