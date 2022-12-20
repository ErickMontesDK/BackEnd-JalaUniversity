import Box from '../entities/box'
import { msgFormat } from '../types/types'

export default interface IBoxService{
    create(limitBoard: number): Promise<msgFormat>
    read(id: number): Promise<Box>
    updateToTail(id: number, coords:number[]): Promise<Box | msgFormat>
    // updateMovement(id: number, maxBoardValue:number): Promise<Snake | msgFormat>
    // delete(id: number): Promise<msgFormat>
}
