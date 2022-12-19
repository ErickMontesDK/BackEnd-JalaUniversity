import { container } from '../../../infrastructure/inversify/inversify.config'
import { Request, Response } from 'express'
import { injectable } from 'inversify'
import ISnakeController from './ISnakecontroller'
import 'reflect-metadata'
import ISnakeService from '../../../domain/repository/ISnakeService'

@injectable()
export default class SnakeControllers implements ISnakeController {
  snakeServices = container.get<ISnakeService>('SnakeService')

  async createSnake (req:Request, res:Response): Promise<void> {
    try {
      if (req.query.limit && req.query.player) {
        const limitBoard = parseInt(req.query.limit as string)
        const player = req.query.player.toString()
        const newSnakeId = await this.snakeServices.create(limitBoard, player)
        res.json(newSnakeId)
      } else {
        throw new Error('not sent values')
      }
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async searchById (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const updatedSnake = await this.snakeServices.read(id)
      res.json(updatedSnake)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async updateDirection (req:Request, res:Response): Promise<void> {
    try {
      if (req.query.direction && req.params.id) {
        const id = parseInt(req.params.id as string)
        const direction = req.query.direction.toString()

        const msg = await this.snakeServices.updateDirection(id, direction)
        res.json(msg)
      }
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async startRunning (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const maxBoardValue = parseInt(req.params.max)

      const updateSnake = await this.snakeServices.updateMovement(id, maxBoardValue)
      res.json(updateSnake)
    } catch (err: unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async growingTail (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const node = req.params.node.toString()

      const updateSnake = await this.snakeServices.updateLength(id, node)
      res.json(updateSnake)
    } catch (err: unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async deleteById (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)

      const msgDelete = await this.snakeServices.delete(id)
      res.json(msgDelete)
    } catch (err: unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }
}
