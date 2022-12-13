import { AppDataSource } from './db-source'
import mapper from './mappers/snake.mapper'
import { injectable } from 'inversify'
import { randomPosition } from '../../domain/utils/randomPosition'
import 'reflect-metadata'
import snakeRepository from '../../domain/repository/snakeRepository'
import Snake from '../../domain/entities/snake'
import { direction } from '../../domain/types'
import dbSnake from './entities/dbSnake'

@injectable()
export default class SnakeData implements snakeRepository {
  async create (seed: number, player: string) {
    const x = randomPosition(seed)
    const y = randomPosition(seed)

    const directions:direction[] = ['up', 'down', 'left', 'right']
    const directionSnakeMove = directions[randomPosition(3)]

    const newSnake = new Snake()
    newSnake.coordX = x
    newSnake.coordY = y
    newSnake.length = 1
    newSnake.user = player
    newSnake.direction = directionSnakeMove

    const repository = AppDataSource.getRepository(dbSnake)
    await repository.save(newSnake)

    const skipN = (await repository.find()).length - 1
    const snakeCreated = (await repository.find({ skip: skipN }))[0]
    return mapper.toEntity(snakeCreated)
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbSnake)
    return await repository.findOneBy({ id })
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
