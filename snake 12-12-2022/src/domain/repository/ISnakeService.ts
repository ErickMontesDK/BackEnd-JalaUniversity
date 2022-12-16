import Snake from '../entities/snake'
import { direction, msgFormat } from '../types/types'

export default interface ISnakeService{
    create(seed: number, player: string): Promise<msgFormat>
    read(id: number): Promise<Snake | msgFormat>
    updateDirection(id: number, direction:direction): Promise<msgFormat>
    updateMovement(id: number, maxBoardValue:number): Promise<Snake | msgFormat>
    delete(id: number): Promise<msgFormat>
}
