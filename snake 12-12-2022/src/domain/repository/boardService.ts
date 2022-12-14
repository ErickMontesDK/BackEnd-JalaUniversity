import Board from '../entities/board'

export default interface boardService{
    create(elements: string):Promise<Board>
    read(id: number): Promise<Board | null>
    delete(id: number): Promise<string>
}
