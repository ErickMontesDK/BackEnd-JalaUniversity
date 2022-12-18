import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import ISnakeRepository from '../../domain/repository/ISnakeRepository'
import dbSnake from './entities/dbSnake'
import { direction } from '../../domain/types/types'
import { movingInDirection } from '../utils/movingDirection'
import returnForId from '../utils/returnForId'

@injectable()
export default class SnakeData implements ISnakeRepository {
  async create (newSnake: dbSnake) {
    const repository = AppDataSource.getRepository(dbSnake)
    await repository.save(newSnake)

    const idSnake = await returnForId(repository)

    return { id: idSnake, message: 'Created' }
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbSnake)
    const SnakeFound = await repository.findOneBy({ id })
    if (SnakeFound) {
      return SnakeFound
    } else {
      return { id, message: 'Not found' }
    }
  }

  async updateDirection (id: number, direction: direction) {
    const repository = AppDataSource.getRepository(dbSnake)
    const findedSnake = await repository.findOneBy({ id })
    if (findedSnake) {
      findedSnake.direction = direction
      await repository.save(findedSnake)

      return { id, message: `Snake moving to ${direction}` }
    } else {
      return { id, message: 'Not found' }
    }
  }

  async startMoving (id: number, maxBoardValue:number) {
    const repository = AppDataSource.getRepository(dbSnake)
    const SnakeFound = await repository.findOneBy({ id })

    if (SnakeFound && maxBoardValue) {
      const updateSnake = movingInDirection(SnakeFound, maxBoardValue)

      await repository.save(updateSnake)

      return updateSnake
    } else {
      return { id, message: 'Snake Not Found' }
    }
  }

  async delete (id: number) {
    const repository = AppDataSource.getRepository(dbSnake)
    const snakeById = await repository.findOneBy({ id })
    if (snakeById) {
      await repository.delete({ id })

      return { id, message: 'Snake deleted' }
    } else {
      return { id, message: 'Snake not found' }
    }
  }
}
