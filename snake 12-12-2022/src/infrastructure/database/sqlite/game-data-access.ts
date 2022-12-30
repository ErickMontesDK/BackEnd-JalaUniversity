import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IGameRepository from '../../../domain/repository/IGameRepository'
import dbGame from './entities/dbGame'
import returnForId from '../../utils/returnForId'
import Game from '../../../domain/entities/game'

@injectable()
export default class GameData implements IGameRepository {
  protected repository = AppDataSource.getRepository(dbGame)

  async create (newGame: dbGame) {
    await this.repository.save(newGame)

    const idGame = await returnForId(this.repository).toString()

    return { id: idGame, message: 'Created' }
  }

  async read (id: string) {
    const fixedId = parseInt(id)
    const GameFound = await this.repository.findOneBy({ id: fixedId })

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
