import Snake from '../entities/snake'
import { msgFormat } from '../types/types'

export default interface ISnakeService{
    create(seed: number, player: string): Promise<msgFormat>
    read(id: number): Promise<Snake>
    updateDirection(id: number, direction:string): Promise<Snake>
    updateMovement(id: number, maxBoardValue:number): Promise<Snake>
    updateLength(id: number, node:string): Promise<Snake | msgFormat>
    resetInitialValues(id: number, boardSize:number): Promise<Snake>
    getBestScores(): Promise<{Player:string, Score:number}[]>
    delete(id: number): Promise<msgFormat>
}
