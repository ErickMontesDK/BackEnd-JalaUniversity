import Piece from './piece'
import position from './position'
import Movements from './movements'

export default class King extends Piece {
  canMoveTo (position: position):boolean {
    const movement = new Movements(this.position, position)
    const movementFile = movement.getFiles()
    const movementRank = movement.getRanks()

    if (movementFile === 0 && movementRank === 1) {
      return true
    } else if (movementFile === 1 && movementRank === 0) {
      return true
    } else if (movementFile === 1 && movementRank === 1) {
      return true
    } else {
      return false
    }
  }
}
