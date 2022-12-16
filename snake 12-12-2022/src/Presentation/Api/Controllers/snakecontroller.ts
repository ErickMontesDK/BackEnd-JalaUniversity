import { container } from '../../../infrastructure/inversify/inversify.config'
import { Request, Response } from 'express'
import { injectable } from 'inversify'
import ISnakeController from './ISnakecontroller'
import 'reflect-metadata'
import { direction } from '../../../domain/types/types'
import translateToDirection from '../../../helpers/translateToDirection'
import ISnakeService from '../../../domain/repository/ISnakeService'

@injectable()
export default class SnakeControllers implements ISnakeController {
  snakeGenerator = container.get<ISnakeService>('SnakeService')

  async createSnake (req:Request, res:Response): Promise<void> {
    if (req.query.limit && req.query.player) {
      const limitBoard = parseInt(req.query.limit as string)
      const player = req.query.player.toString()

      const newSnakeId = await this.snakeGenerator.create(limitBoard, player)
      res.json({ idSnake: newSnakeId })
    } else {
      res.json({ msg: 'Some parameters are missing (player name or board limit' })
    }
  }

  async searchSnake (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id as string)

    const updatedSnake = await this.snakeGenerator.read(id)
    res.json(updatedSnake)
  }

  async updateDirection (req:Request, res:Response): Promise<void> {
    if (req.query.direction && req.params.id) {
      const id = parseInt(req.params.id as string)
      const move = req.query.direction.toString()

      const direction:direction = translateToDirection(move)
      const msg = await this.snakeGenerator.updateDirection(id, direction)
      res.send(msg)
    } else {
      res.json({ msg: 'Some parameters are missing (id or new direction' })
    }
  }

  async startRunning (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id as string)
    const maxBoardValue = parseInt(req.params.max as string)

    const updateSnake = await this.snakeGenerator.updateMovement(id, maxBoardValue)
    res.send(updateSnake)
  }
}
