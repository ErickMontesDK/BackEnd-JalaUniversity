import Snake from '../entities/snake'
import { msgFormat } from '../types/types'

export default interface ISnakeRepository{
    create(newSnake: Snake): Promise<msgFormat>
    read(id: number): Promise<Snake>
    readBestScores(): Promise<Snake[]>
    update(SnakeFound: Snake): Promise<Snake>
    delete(id: number): Promise<msgFormat>
}
