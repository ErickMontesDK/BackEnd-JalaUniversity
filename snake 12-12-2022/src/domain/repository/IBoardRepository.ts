import Board from '../entities/board'
import { msgFormat } from '../types/types'

export default interface IBoardRepository{
    create(board: Board):Promise<msgFormat>
    read(id: number): Promise<Board>
    delete(id: number): Promise<msgFormat>
}
