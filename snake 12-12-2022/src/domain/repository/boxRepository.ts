import Box from '../entities/box'

export default interface boxRepository {
    create(newBox:Box): Promise<Box>
    read(id: number): Promise<Box | null>
    followSnake(id: number): Promise<Box | null>
    foodToTail(id: number): Promise<Box | null>
    delete(id: number): Promise<string>
}
