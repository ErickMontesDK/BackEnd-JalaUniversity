import Snake from '../entities/snake'
import { direction } from '../types'

export default interface snakeService{
    create(seed: number, player: string): Promise<Snake>
    read(id: number): Promise<Snake | null>
    updateDirection(id: number, direction:direction): Promise<string>
    delete(id: number): Promise<string>
}
