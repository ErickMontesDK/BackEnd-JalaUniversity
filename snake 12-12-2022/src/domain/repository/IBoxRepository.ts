import Box from '../entities/box'
import { msgFormat } from '../types/types'

export default interface IBoxRepository {
    create(newBox:Box): Promise<msgFormat>
    read(id: string): Promise<Box>
    update(box: Box): Promise<Box>
}
