import Snake from '../entities/snake'
import { direction, notFoundmsg } from '../types/types'

export default interface ISnakeService{
    create(seed: number, player: string): Promise<number>
    read(id: number): Promise<Snake | null>
    updateDirection(id: number, direction:direction): Promise<string>
    updateMovement(id: number, maxBoardValue:number): Promise<Snake | notFoundmsg>
    delete(id: number): Promise<string>
}
