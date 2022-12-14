import Snake from '../entities/snake'
import { direction } from '../types'

export default interface snakeRepository{
    create(newSnake: Snake): Promise<Snake>
    read(id: number): Promise<Snake | null>
    updateDirection(id: number, direction:direction): Promise<string>
    updateMovement(id: number): Promise<string>
    delete(id: number): Promise<string>
}
