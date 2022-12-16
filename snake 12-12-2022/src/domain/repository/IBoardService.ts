import Board from '../entities/board'
import { msgFormat } from '../types/types'

export default interface IBoardService{
    create(elements: string):Promise<msgFormat>
    read(id: number): Promise<Board | msgFormat>
    delete(id: number): Promise<msgFormat>
}
