// A chess piece
import { Color, File, Rank } from './types'
import Position from './position'

export default abstract class Piece {
  protected position: Position

  constructor (private readonly color: Color, file: File, rank: Rank) {
    this.position = new Position(file, rank)
  }

  moveTo (position: Position) {
    this.position = position
  }

  abstract canMoveTo (position: Position): boolean
}
