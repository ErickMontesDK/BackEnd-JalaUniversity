import { direction } from '../types/types'
import Position from './position'

export default class Snake extends Position {
  length!: number
  user!: string
  direction!: direction
}
