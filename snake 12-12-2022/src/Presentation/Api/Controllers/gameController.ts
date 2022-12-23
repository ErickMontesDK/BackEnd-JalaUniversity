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
      const gameFound = await this.GameService.displayBoardWithElements(id)
      res.json(gameFound)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async showAllDataElementsInGame (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const gameFound = await this.GameService.getAllDataForTheGame(id)
      res.json(gameFound)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async changeFood (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const gameFound = await this.GameService.updateFoodInGame(id)
      res.json(gameFound)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async runGame (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const gameRunningMsg = await this.GameService.runGameInLoopTillLose(id)
      res.json(gameRunningMsg)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async stopGame (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const stopRunningMsg = await this.GameService.stateGameEnded(id)
      res.json(stopRunningMsg)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }

  async resetGameScores (req:Request, res:Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string)
      const resetGameMsg = await this.GameService.resetGame(id)
      res.json(resetGameMsg)
    } catch (err:unknown) {
      if (err instanceof Error) res.json({ name: err.name, msg: err.message })
    }
  }
}
