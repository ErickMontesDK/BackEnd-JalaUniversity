import Board from '../entities/board'
import Box from '../entities/box'
import Game from '../entities/game'
import Snake from '../entities/snake'
import { msgFormat, gameState } from '../types/types'

export default interface IGameService{
    create(limitBoard: number, players:string, speed:number): Promise<msgFormat>
    read(id: string): Promise<Game>
    getAllDataForTheGame(id: string): Promise<{boardInfo:Board, foodInfo:Box, snakesInfo:Snake[], gameState:gameState, scores:object[]}>
    displayBoardWithElements(id: string): Promise<(string | string[][] | object[])[]>
    updateFoodInGame(gameId: string): Promise<Game>
    stateGameRunning(gameId: string): Promise<Game>
    stateGameEnded(gameId: string): Promise<Game>
    runGameInLoopTillLose(gameId: string): Promise<msgFormat>
    resetGame(gameId: string): Promise<msgFormat>
}
