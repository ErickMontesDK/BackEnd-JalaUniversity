import { Request, Response } from 'express'
import { injectable } from 'inversify'
import { container } from '../../../infrastructure/inversify/inversify.config'
import BoardService from '../../../services/board-services'
import IBoardController from './IBoardController'

@injectable()
export default class BoardController implements IBoardController {
  boardGenerator = container.get<BoardService>('BoardService')

  async createBoard (req:Request, res:Response): Promise<void> {
    const newBoard = await this.boardGenerator.create(req.params.elements)
    res.send(newBoard)
  }
}
