import { AppDataSource } from './db-source'
import positionRepository from '../../domain/repository/positionRepository'
import dbPosition from './entities/dbPosition'
import Position from '../../domain/entities/position'
import mapper from './mappers/position.mapper'
import { injectable } from 'inversify'
import { randomPosition } from '../../helpers/randomPosition'
import 'reflect-metadata'

@injectable()
export default class PositionData implements positionRepository {
  async create (seed: number) {
    const x = randomPosition(seed)
    const y = randomPosition(seed)
    const newPosition = new Position()
    newPosition.coordX = x
    newPosition.coordY = y

    const repository = AppDataSource.getRepository(dbPosition)
    await repository.save(newPosition)

    const skipN = (await repository.find()).length - 1
    const positionCreated = (await repository.find({ skip: skipN }))[0]
    return mapper.toEntity(positionCreated)
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbPosition)
    return await repository.findOneBy({ id })
  }

  async delete (id: number) {
    const repository = AppDataSource.getRepository(dbPosition)
    const positionById = await repository.findOneBy({ id })
    if (positionById) {
      await repository.delete({ id })
      return `Position with id ${id} was deleted`
    } else {
      return `Position with id ${id} was not found `
    }
  }
}
