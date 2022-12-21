import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import ISnakeRepository from '../../domain/repository/ISnakeRepository'
import dbSnake from './entities/dbSnake'
import returnForId from '../utils/returnForId'
import Snake from '../../domain/entities/snake'

@injectable()
export default class SnakeData implements ISnakeRepository {
  protected repository = AppDataSource.getRepository(dbSnake)

  async create (newSnake: dbSnake) {
    await this.repository.save(newSnake)

    const idSnake = await returnForId(this.repository)

    return { id: idSnake, message: 'Created' }
  }

  async read (id: number) {
    const SnakeFound = await this.repository.findOneBy({ id })

    if (SnakeFound) {
      return SnakeFound
    } else {
      throw new Error(`Could not snake with id ${id}`)
    }
  }

  async readBestScores () {
    const scoreSnakesFound = await this.repository.find({
      take: 5,
      order: {
        length: 'DESC'
      },
      select: ['user', 'length']
    })

    if (scoreSnakesFound) {
      return scoreSnakesFound
    } else {
      throw new Error('Could not find Scores')
    }
  }

  async update (SnakeFound: Snake) {
    if (SnakeFound) {
      await this.repository.save(SnakeFound)

      return SnakeFound
    } else {
      throw new Error('Element not found')
    }
  }

  async delete (id: number) {
    const snakeById = await this.read(id)

    if (snakeById) {
      await this.repository.delete({ id })

      return { id, message: 'Snake deleted' }
    } else {
      throw new Error(`Snake with id:${id} not found`)
    }
  }
}
