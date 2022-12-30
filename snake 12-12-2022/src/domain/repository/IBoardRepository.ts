import Board from '../entities/board'
import { msgFormat } from '../types/types'

export default interface IBoardRepository{
    create(board: Board):Promise<msgFormat>
    read(id: string): Promise<Board>
    delete(id: string): Promise<msgFormat>
}
