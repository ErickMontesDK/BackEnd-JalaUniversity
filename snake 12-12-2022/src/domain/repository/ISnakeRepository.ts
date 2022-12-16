import Snake from '../entities/snake'
import { direction, notFoundmsg } from '../types/types'

export default interface ISnakeRepository{
    create(newSnake: Snake): Promise<number>
    read(id: number): Promise<Snake | null>
    updateDirection(id: number, direction:direction): Promise<string>
    startMoving(id: number, maxBoardValue:number): Promise<Snake | notFoundmsg>
    delete(id: number): Promise<string>
}
