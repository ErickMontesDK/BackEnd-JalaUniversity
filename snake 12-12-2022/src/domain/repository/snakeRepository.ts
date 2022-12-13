import Snake from '../entities/snake'

export default interface snakeRepository{
    create(seed: number, player: string): Promise<Snake>
    read(id: number): Promise<Snake | null>
    delete(id: number): Promise<string>
}
