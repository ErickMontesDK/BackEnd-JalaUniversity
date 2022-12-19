import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import returnForId from '../utils/returnForId'
import dbGame from './entities/dbGame'
import IGameRepository from '../../domain/repository/IGameRepository'

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

  // async updateDirection (id: number, direction: direction) {
  //   const repository = AppDataSource.getRepository(dbSnake)
  //   const findedSnake = await repository.findOneBy({ id })
  //   if (findedSnake) {
  //     findedSnake.direction = direction
  //     await repository.save(findedSnake)

  //     return { id, message: `Snake moving to ${direction}` }
  //   } else {
  //     return { id, message: 'Not found' }
  //   }
  // }

  // async FoodIntoTail (id: number, coords: number[]) {
  //   const repository = AppDataSource.getRepository(dbBox)
  //   const boxFound = await repository.findOneBy({ id })
  //   if (boxFound) {
  //     boxFound.coordX = coords[0]
  //     boxFound.coordY = coords[1]

  //     await repository.save(boxFound)
  //     return boxFound
  //   } else {
  //     return { id, message: 'Box Not Found' }
  //   }
  // }

  // async delete (id: number) {
  //   const repository = AppDataSource.getRepository(dbSnake)
  //   const snakeById = await repository.findOneBy({ id })
  //   if (snakeById) {
  //     await repository.delete({ id })

  //     return { id, message: 'Snake deleted' }
  //   } else {
  //     return { id, message: 'Snake not found' }
  //   }
  // }
}
