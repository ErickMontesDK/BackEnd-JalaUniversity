import { Request, Response } from 'express'

export default interface ISnakeController {
    createSnake(req: Request, res:Response): Promise<void>;
    updateDirection(req: Request, res:Response): Promise<void>;
    startRunning(req: Request, res:Response): Promise<void>;
    searchById(req: Request, res:Response): Promise<void>;
    deleteById(req: Request, res:Response): Promise<void>;
}
