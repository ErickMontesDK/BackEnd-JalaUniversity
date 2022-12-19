import Snake from '../entities/snake'
import { msgFormat } from '../types/types'

export default interface ISnakeService{
    create(seed: number, player: string): Promise<msgFormat>
    read(id: number): Promise<Snake | msgFormat>
    updateDirection(id: number, direction:string): Promise<msgFormat>
    updateMovement(id: number, maxBoardValue:number): Promise<Snake | msgFormat>
    updateLength(id: number, node:string): Promise<Snake | msgFormat>
    delete(id: number): Promise<msgFormat>
}
