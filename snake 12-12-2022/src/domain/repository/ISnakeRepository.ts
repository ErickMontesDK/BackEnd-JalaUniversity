import Snake from '../entities/snake'
import { msgFormat } from '../types/types'

export default interface ISnakeRepository{
    create(newSnake: Snake): Promise<msgFormat>
    read(id: string): Promise<Snake>
    readBestScores(): Promise<Snake[]>
    update(SnakeFound: Snake): Promise<Snake>
    delete(id: string): Promise<msgFormat>
}
