import { Request, Response } from 'express'
import { injectable } from 'inversify'
import IBoardService from '../../../domain/repository/IBoardService'
import { container } from '../../../infrastructure/inversify/inversify.config'
import IBoardController from './IBoardController'

@injectable()
export default class BoardController implements IBoardController {
  boardGenerator = container.get<IBoardService>('BoardService')

  async createBoard (req:Request, res:Response): Promise<void> {
    if (req.params.elements) {
      const newBoard = await this.boardGenerator.create(req.params.elements)
      res.json(newBoard)
    } else {
      res.json({ msg: 'Size board parameter is not specified' })
    }
  }

  async searchById (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id.toString())
    const boardFound = await this.boardGenerator.read(id)
    res.json(boardFound)
  }

  async deleteById (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id.toString())
    const msgDelete = await this.boardGenerator.delete(id)
    res.json(msgDelete)
  }
}
