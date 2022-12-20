import { container } from '../../../infrastructure/inversify/inversify.config'
import { Request, Response } from 'express'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IGameController from './IGameController'
import IGameService from '../../../domain/repository/IGameService'

@injectable()
export default class GameController implements IGameController {
  GameService = container.get<IGameService>('GameService')

  async createGame (req:Request, res:Response): Promise<void> {
    try {
      if (req.query.size && req.query.players && req.query.speed) {
        const size = parseInt(req.query.size as string)
        const players = req.query.players.toString()
        const speed = parseInt(req.query.speed as string)

        const newGame = await this.GameService.create(size, players, speed)
        res.json(newGame)
      }
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async searchById (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const BoxFound = await this.GameService.read(id)
      res.json(BoxFound)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async showBoardGame (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const BoxFound = await this.GameService.displayBoardWithElements(id)
      res.json(BoxFound)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

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
