import Piece from './piece'
import position from './position'
import Movements from './movements'

export default class Queen extends Piece {
  canMoveTo (position: position):boolean {
    const movement = new Movements(this.position, position)
    const movementFile = movement.getFiles()
    const movementRank = movement.getRanks()

    if (movementFile === 0 && movementRank !== 0) {
      return true
    } else if (movementFile !== 0 && movementRank === 0) {
      return true
    } else if (movementFile === movementRank) {
      return true
    } else {
      return false
    }
  }
}
