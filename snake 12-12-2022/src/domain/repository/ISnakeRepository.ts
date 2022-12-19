import Snake from '../entities/snake'
import { direction, msgFormat } from '../types/types'

export default interface ISnakeRepository{
    create(newSnake: Snake): Promise<msgFormat>
    read(id: number): Promise<Snake>
    updateDirection(id: number, direction:direction): Promise<msgFormat>
    startMoving(id: number, maxBoardValue:number): Promise<Snake | msgFormat>
    growSnake(snake: Snake): Promise<Snake | msgFormat>
    delete(id: number): Promise<msgFormat>
}
