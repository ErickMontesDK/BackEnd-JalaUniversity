import dbPosition from '../database/entities/dbPosition'
import Position from '../../domain/entities/position'

export default class mapper {
  static toEntity (position: dbPosition) {
    const entityPosition: Position = new Position()
    entityPosition.id = position.id
    entityPosition.coordX = position.coordX
    entityPosition.coordY = position.coordY

    return entityPosition
  }
}
