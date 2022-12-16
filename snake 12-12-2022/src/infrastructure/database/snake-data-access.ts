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
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    await repository.save(newSnake)

    const idSnake = await returnForId(repository)
    await AppDataSource.destroy()
    return { id: idSnake, message: 'Created' }
  }

  async read (id: number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const SnakeFound = await repository.findOneBy({ id })
    if (SnakeFound) {
      await AppDataSource.destroy()
      return SnakeFound
    } else {
      await AppDataSource.destroy()
      return { id, message: 'Not found' }
    }
  }

  async updateDirection (id: number, direction: direction) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const findedSnake = await repository.findOneBy({ id })
    if (findedSnake) {
      findedSnake.direction = direction
      await repository.save(findedSnake)
      await AppDataSource.destroy()
      return { id, message: `Snake moving to ${direction}` }
    } else {
      await AppDataSource.destroy()
      return { id, message: 'Not found' }
    }
  }

  async startMoving (id: number, maxBoardValue:number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const SnakeFound = await repository.findOneBy({ id })

    if (SnakeFound && maxBoardValue) {
      const updateSnake = movingInDirection(SnakeFound, maxBoardValue)

      await repository.save(updateSnake)
      await AppDataSource.destroy()
      return updateSnake
    } else {
      await AppDataSource.destroy()
      return { id, message: 'Snake Not Found' }
    }
  }

  async delete (id: number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const snakeById = await repository.findOneBy({ id })
    if (snakeById) {
      await repository.delete({ id })
      await AppDataSource.destroy()
      return { id, message: 'Snake deleted' }
    } else {
      await AppDataSource.destroy()
      return { id, message: 'Snake not found' }
    }
  }
}
