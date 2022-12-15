import { Request, Response } from 'express'

export default interface IBoardController {
    createBoard(req: Request, res: Response): Promise <void>
}
