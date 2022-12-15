import { AppDataSource } from './db-source'
import mapper from '../mappers/snake.mapper'
import { injectable } from 'inversify'
import 'reflect-metadata'
import snakeRepository from '../../domain/repository/snakeRepository'
import dbSnake from './entities/dbSnake'
import { direction } from '../../domain/types/types'
import { movingInDirection } from '../utils/movingDirection'

@injectable()
export default class SnakeData implements snakeRepository {
  async create (newSnake: dbSnake) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    await repository.save(newSnake)

    const skipN = (await repository.find()).length - 1
    const snakeCreated = (await repository.find({ skip: skipN }))[0]
    await AppDataSource.destroy()
    return mapper.toEntity(snakeCreated)
  }

  async read (id: number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const findedSnake = await repository.findOneBy({ id })
    await AppDataSource.destroy()
    return findedSnake
  }

  async updateDirection (id: number, direction: direction) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const findedSnake = await repository.findOneBy({ id })
    if (findedSnake) {
      findedSnake.direction = direction
      await repository.save(findedSnake)
      await AppDataSource.destroy()
      return `snake with id ${id} move ${direction}`
    } else {
      await AppDataSource.destroy()
      return `can´t find snake with id ${id}`
    }
  }

  async updateMovement (id: number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbSnake)
    const findedSnake = await repository.findOneBy({ id })

    if (findedSnake) {
      const updateSnake = movingInDirection(findedSnake)
      const direction = updateSnake.direction

      await repository.save(updateSnake)
      await AppDataSource.destroy()
      return `snake with id ${id} move one to ${direction}`
    } else {
      await AppDataSource.destroy()
      return `can´t find snake with id ${id}`
    }
  }

  async delete (id: number) {
    const repository = AppDataSource.getRepository(dbSnake)
    const snakeById = await repository.findOneBy({ id })
    if (snakeById) {
      await repository.delete({ id })
      return `Snake with id ${id} was deleted`
    } else {
      return `Snake with id ${id} was not found `
    }
  }
}
