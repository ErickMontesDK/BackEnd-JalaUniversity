import { gameState } from '../types/types'

export default class Game {
  id!: number
  gameState!: gameState
  gameSpeed!: number
  idBoard!:number
  idSnakes!:string
  idFood!:number
}
