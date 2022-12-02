// A set of coordinates for a piece
import { File, Rank } from './types'

export default class Position {
  // eslint-disable-next-line no-useless-constructor
  constructor (public file: File, public rank: Rank) {}
}
