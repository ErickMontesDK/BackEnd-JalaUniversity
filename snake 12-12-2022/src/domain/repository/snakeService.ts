import Snake from '../entities/snake'
import { direction } from '../types/types'

export default interface snakeService{
    create(seed: number, player: string): Promise<Snake>
    read(id: number): Promise<Snake | null>
    updateDirection(id: number, direction:direction): Promise<string>
    updateMovement(id: number): Promise<string>
    delete(id: number): Promise<string>
}
