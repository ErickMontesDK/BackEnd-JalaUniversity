import Board from '../entities/board'

export default interface IBoardRepository{
    create(board: Board):Promise<number>
    read(id: number): Promise<Board | {idBoard: number, state:string}>
    delete(id: number): Promise<string>
}
