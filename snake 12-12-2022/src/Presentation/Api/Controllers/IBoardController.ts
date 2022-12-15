import { Request, Response } from 'express'

export default interface IBoardController {
    searchById(req: Request, res: Response): Promise<void>
    createBoard(req: Request, res: Response): Promise <void>
    deleteById(req: Request, res: Response): Promise<void>
}
