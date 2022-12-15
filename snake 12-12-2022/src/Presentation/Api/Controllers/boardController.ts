import { Request, Response } from 'express'
import { injectable } from 'inversify'
import IBoardService from '../../../domain/repository/IBoardService'
import { container } from '../../../infrastructure/inversify/inversify.config'
import IBoardController from './IBoardController'

@injectable()
export default class BoardController implements IBoardController {
  boardGenerator = container.get<IBoardService>('BoardService')

  async searchById (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id.toString())
    const boardFound = await this.boardGenerator.read(id)
    console.log(boardFound)
    res.json(boardFound)
  }

  async createBoard (req:Request, res:Response): Promise<void> {
    const newBoard = await this.boardGenerator.create(req.params.elements)
    console.log(newBoard)
    res.json({ idBoard: newBoard })
  }

  async deleteById (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id.toString())
    const stateOfBoard = await this.boardGenerator.delete(id)
    console.log(stateOfBoard)
    res.json({ idBoard: id, msg: stateOfBoard })
  }
}
