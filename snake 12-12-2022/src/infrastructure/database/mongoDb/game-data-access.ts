import { injectable } from 'inversify'
import 'reflect-metadata'
import GameModel from './models/game-model'
import Game from '../../../domain/entities/game'
import IGameRepository from '../../../domain/repository/IGameRepository'

@injectable()
export default class GameData implements IGameRepository {
  async create (newGame: Game) {
    if (newGame) {
      const createdGame = new GameModel(newGame)
      const newGameReturned = await createdGame.save()
      return { id: newGameReturned.id.toString(), message: 'Game created' }
    } else {
      throw new Error('Game was not created')
    }
  }

  async read (id: string) {
    const GameFound = await GameModel.findById(id)

    if (GameFound) {
      return GameFound
    } else {
      throw new Error(`Game with id ${id} not found`)
    }
  }

  async updateGame (game: Game) {
    const id = game.id
    const updateGame = await GameModel.findById(id)
    if (updateGame) {
      const response = await updateGame.set(game)
      return response.save()
    } else {
      throw new Error('Element not found')
    }
  }
}
