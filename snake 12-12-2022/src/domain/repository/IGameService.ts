import Board from '../entities/board'
import Box from '../entities/box'
import Game from '../entities/game'
import Snake from '../entities/snake'
import { msgFormat, gameState } from '../types/types'

export default interface IGameService{
    create(limitBoard: number, players:string, speed:number): Promise<msgFormat>
    read(id: number): Promise<Game>
    getAllDataForTheGame(id: number): Promise<{boardInfo:Board, foodInfo:Box, snakesInfo:Snake[], gameState:gameState, scores:object[]}>
    displayBoardWithElements(id: number): Promise<(string | string[][] | object[])[]>
    updateFoodInGame(gameId: number): Promise<Game>
    stateGameRunning(gameId: number): Promise<Game>
    stateGameEnded(gameId: number): Promise<Game>
    runGameInLoopTillLose(gameId: number): Promise<msgFormat>
    resetGame(gameId: number): Promise<msgFormat>
}
