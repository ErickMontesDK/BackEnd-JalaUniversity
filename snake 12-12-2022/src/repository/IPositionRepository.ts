import Position from '../entities/position'

export default interface PositionCreate{
    create(numbX: number, numbY: number): Position
}
