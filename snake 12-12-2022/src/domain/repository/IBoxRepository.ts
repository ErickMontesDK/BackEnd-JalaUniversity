import Box from '../entities/box'
import { msgFormat } from '../types/types'

export default interface IBoxRepository {
    create(newBox:Box): Promise<msgFormat>
    read(id: number): Promise<Box>
    updatePositionState(id: number, foundbox: Box): Promise<Box | msgFormat>
    // foodToTail(id: number): Promise<Box | msgFormat>
    // delete(id: number): Promise<string>
}
