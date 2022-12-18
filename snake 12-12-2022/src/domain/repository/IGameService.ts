import { msgFormat } from '../types/types'

export default interface IGameService{
    create(limitBoard: number, players:string, speed:number): Promise<msgFormat>
    // read(id: number): Promise<Box | msgFormat>
    // updateDirection(id: number, direction:string): Promise<msgFormat>
    // updateMovement(id: number, maxBoardValue:number): Promise<Snake | msgFormat>
    // delete(id: number): Promise<msgFormat>
}
