import Board from '../entities/board'

export default interface IBoardService{
    create(elements: string):Promise<number>
    read(id: number): Promise<Board | {idBoard: number, state:string}>
    delete(id: number): Promise<string>
}
