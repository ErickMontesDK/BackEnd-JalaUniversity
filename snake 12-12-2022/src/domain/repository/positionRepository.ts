import Position from '../entities/position'

export default interface positionRepository{
    create(seed: number): Promise<Position>
    read(id: number): Promise<Position | null>
    delete(id: number): Promise<string>
}
