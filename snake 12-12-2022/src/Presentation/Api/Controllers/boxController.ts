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

  // async searchById (req:Request, res:Response): Promise<void> {
  //   try {
  //     const id = parseInt(req.params.id as string)
  //     const updatedSnake = await this.snakeServices.read(id)
  //     res.json(updatedSnake)
  //   } catch (err:unknown) {
  //     if (err instanceof Error) res.json({ name: err.name, msg: err.message })
  //   }
  // }

  // async updateDirection (req:Request, res:Response): Promise<void> {
  //   try {
  //     if (req.query.direction && req.params.id) {
  //       const id = parseInt(req.params.id as string)
  //       const direction = req.query.direction.toString()

  //       const msg = await this.snakeServices.updateDirection(id, direction)
  //       res.json(msg)
  //     }
  //   } catch (err:unknown) {
  //     if (err instanceof Error) res.json({ name: err.name, msg: err.message })
  //   }
  // }

  // async startRunning (req:Request, res:Response): Promise<void> {
  //   try {
  //     const id = parseInt(req.params.id as string)
  //     const maxBoardValue = parseInt(req.params.max)

  //     const updateSnake = await this.snakeServices.updateMovement(id, maxBoardValue)
  //     res.json(updateSnake)
  //   } catch (err: unknown) {
  //     if (err instanceof Error) res.json({ name: err.name, msg: err.message })
  //   }
  // }

  // async deleteById (req:Request, res:Response): Promise<void> {
  //   try {
  //     const id = parseInt(req.params.id as string)

  //     const msgDelete = await this.snakeServices.delete(id)
  //     res.json(msgDelete)
  //   } catch (err: unknown) {
  //     if (err instanceof Error) res.json({ name: err.name, msg: err.message })
  //   }
  // }
}
