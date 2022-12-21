import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import returnForId from '../utils/returnForId'
import dbGame from './entities/dbGame'
import IGameRepository from '../../domain/repository/IGameRepository'
import Game from '../../domain/entities/game'

@injectable()
export default class GameData implements IGameRepository {
  protected repository = AppDataSource.getRepository(dbGame)

  async create (newGame: dbGame) {
    await this.repository.save(newGame)

    const idGame = await returnForId(this.repository)

    return { id: idGame, message: 'Created' }
  }

  async read (id: number) {
    const GameFound = await this.repository.findOneBy({ id })

    if (GameFound) {
      return GameFound
    } else {
      throw new Error(`Could not find Game with id ${id}`)
    }
  }

  async updateGame (game: Game) {
    await this.repository.save(game)

    return game
  }
}
