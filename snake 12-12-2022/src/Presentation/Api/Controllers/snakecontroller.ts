import snakeService from '../../../domain/repository/snakeService'
import { container } from '../../../infrastructure/inversify/inversify.config'
import { Request, Response } from 'express'
import { injectable } from 'inversify'
import ISnakeController from './ISnakecontroller'
import 'reflect-metadata'
import { direction } from '../../../domain/types/types'
import translateToDirection from '../../../helpers/translateToDirection'

@injectable()
export default class SnakeControllers implements ISnakeController {
  snakeGenerator = container.get<snakeService>('SnakeService')

  async createSnake (req:Request, res:Response): Promise<void> {
    if (req.query.seed && req.query.user) {
      const seed = parseInt(req.query.seed as string)
      const player = req.query.user.toString()

      const newSnake = await this.snakeGenerator.create(seed, player)
      res.send(newSnake)
    } else {
      res.send('A parameter is missing (user or seed')
    }
  }

  async updateDirection (req:Request, res:Response): Promise<void> {
    if (req.query.direction && req.params.id) {
      const id = parseInt(req.params.id as string)
      const move = req.query.direction.toString()

      const direction:direction = translateToDirection(move)
      const msg = await this.snakeGenerator.updateDirection(id, direction)
      res.send(msg)
    }
  }

  async startRunning (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id as string)

    const updateSnake = await this.snakeGenerator.updateMovement(id)
    res.send(updateSnake)
  }

  async searchSnake (req:Request, res:Response): Promise<void> {
    const id = parseInt(req.params.id as string)

    const updateSnake = await this.snakeGenerator.read(id)
    res.send(updateSnake)
  }
}
