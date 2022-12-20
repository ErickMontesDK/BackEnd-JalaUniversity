import { Request, Response } from 'express'

export default interface IBoxController {
    createSnake(req: Request, res:Response): Promise<void>;
    turnIntoTail(req: Request, res:Response): Promise<void>;
    // startRunning(req: Request, res:Response): Promise<void>;
    searchById(req: Request, res:Response): Promise<void>;
    // deleteById(req: Request, res:Response): Promise<void>;
}
