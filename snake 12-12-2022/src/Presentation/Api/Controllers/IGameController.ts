import { Request, Response } from 'express'

export default interface IGameController {
    searchById(req: Request, res: Response): Promise<void>
    createGame(req: Request, res: Response): Promise <void>
    // deleteById(req: Request, res: Response): Promise<void>
}
