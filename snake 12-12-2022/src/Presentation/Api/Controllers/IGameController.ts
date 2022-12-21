import { Request, Response } from 'express'

export default interface IGameController {
    createGame(req: Request, res: Response): Promise <void>
    searchById(req: Request, res: Response): Promise<void>
    showBoardGame(req: Request, res: Response): Promise<void>
    changeFood(req: Request, res: Response): Promise<void>
    runGame(req: Request, res: Response): Promise<void>
    stopGame(req: Request, res: Response): Promise<void>
    resetGameScores(req: Request, res: Response): Promise<void>
}
