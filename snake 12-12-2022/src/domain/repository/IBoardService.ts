import Board from '../entities/board'
import { msgFormat } from '../types/types'

export default interface IBoardService{
    create(boardSize: number):Promise<msgFormat>
    read(id: number): Promise<Board | msgFormat>
    delete(id: number): Promise<msgFormat>
}
