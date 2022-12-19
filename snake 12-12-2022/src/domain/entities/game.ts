import { gameState } from '../types/types'

export default class Game {
  gameState!: gameState
  gameSpeed!: number
  idBoard!:number
  idSnakes!:string
  idBodySnake!:string
  idFood!:number
}
