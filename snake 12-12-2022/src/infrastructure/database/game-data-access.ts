import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import returnForId from '../utils/returnForId'
import dbGame from './entities/dbGame'
import IGameRepository from '../../domain/repository/IGameRepository'
import Game from '../../domain/entities/game'

@injectable()
export default class GameData implements IGameRepository {
  async create (newGame: dbGame) {
    const repository = AppDataSource.getRepository(dbGame)
    await repository.save(newGame)

    const idGame = await returnForId(repository)

    return { id: idGame, message: 'Created' }
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbGame)
    const GameFound = await repository.findOneBy({ id })
    if (GameFound) {
      return GameFound
    } else {
      throw new Error(`Could not find Game with id ${id}`)
    }
  }

  async updateGame (game: Game) {
    const repository = AppDataSource.getRepository(dbGame)

    await repository.save(game)
    console.log(game)
    return game
  }
}
