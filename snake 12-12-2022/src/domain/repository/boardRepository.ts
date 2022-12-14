import Board from '../entities/board'

export default interface BoardRepository{
    create(board: Board):Promise<Board>
    read(id: number): Promise<Board | null>
    delete(id: number): Promise<string>
}