import Snake from '../entities/snake'
import { msgFormat } from '../types/types'

export default interface ISnakeService{
    create(seed: number, player: string): Promise<msgFormat>
    read(id: string): Promise<Snake>
    updateDirection(id: string, direction:string): Promise<Snake>
    updateMovement(id: string, maxBoardValue:number): Promise<Snake>
    updateLength(id: string, node:string): Promise<Snake | msgFormat>
    resetInitialValues(id: string, boardSize:number): Promise<Snake>
    getBestScores(): Promise<{Player:string, Score:number}[]>
    delete(id: string): Promise<msgFormat>
}
