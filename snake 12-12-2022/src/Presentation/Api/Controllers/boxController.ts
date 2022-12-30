import { container } from '../../../infrastructure/inversify/inversify.config'
import { Request, Response } from 'express'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IBoxController from './IBoxController'
import IBoxService from '../../../domain/repository/IBoxService'

@injectable()
export default class BoxController implements IBoxController {
  BoxService = container.get<IBoxService>('BoxService')

  async createSnake (req:Request, res:Response): Promise<void> {
    try {
      const limitBoard = parseInt(req.params.max as string)

      const newFood = await this.BoxService.create(limitBoard)
      res.json(newFood)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async searchById (req:Request, res:Response): Promise<void> {
    try {
      const id = req.params.id as string
      const BoxFound = await this.BoxService.read(id)
      res.json(BoxFound)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async turnIntoTail (req:Request, res:Response): Promise<void> {
    try {
      const id = req.params.id as string
      const coordx = parseInt(req.params.coordx as string)
      const coordy = parseInt(req.params.coordy as string)
      const UpdatedBox = await this.BoxService.updateToTail(id, [coordx, coordy])
      res.json(UpdatedBox)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }
}
