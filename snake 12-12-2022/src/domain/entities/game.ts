import { gameState } from '../types/types'

export default class Game {
  id!: number
  gameState!: gameState
  gameSpeed!: number
  idBoard!:string
  idSnakes!:string
  idFood!:string
}
