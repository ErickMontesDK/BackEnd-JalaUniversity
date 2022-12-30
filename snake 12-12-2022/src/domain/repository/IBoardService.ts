import Board from '../entities/board'
import { msgFormat } from '../types/types'

export default interface IBoardService{
    create(boardSize: number):Promise<msgFormat>
    read(id: string): Promise<Board>
    delete(id: string): Promise<msgFormat>
}
