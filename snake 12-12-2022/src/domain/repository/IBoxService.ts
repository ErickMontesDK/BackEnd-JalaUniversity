import Box from '../entities/box'
import { msgFormat } from '../types/types'

export default interface IBoxService{
    create(limitBoard: number): Promise<msgFormat>
    // read(id: number): Promise<Snake | msgFormat>
    // updateDirection(id: number, direction:string): Promise<msgFormat>
    // updateMovement(id: number, maxBoardValue:number): Promise<Snake | msgFormat>
    // delete(id: number): Promise<msgFormat>
}
