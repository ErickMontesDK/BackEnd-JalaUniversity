import Snake from '../entities/snake'
import { direction, msgFormat } from '../types/types'

export default interface ISnakeRepository{
    create(newSnake: Snake): Promise<msgFormat>
    read(id: number): Promise<Snake>
    updateDirection(id: number, direction:direction): Promise<msgFormat>
    startMoving(updateSnake: Snake): Promise<Snake>
    growSnake(snake: Snake): Promise<Snake | msgFormat>
    delete(id: number): Promise<msgFormat>
}
