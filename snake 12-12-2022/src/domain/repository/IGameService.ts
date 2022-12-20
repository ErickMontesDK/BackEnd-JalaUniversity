import Game from '../entities/game'
import { msgFormat } from '../types/types'

export default interface IGameService{
    create(limitBoard: number, players:string, speed:number): Promise<msgFormat>
    read(id: number): Promise<Game>
    displayBoardWithElements(id: number): Promise<(string | string[][])[]>
    updateFoodInGame(gameId: number): Promise<Game>
}
