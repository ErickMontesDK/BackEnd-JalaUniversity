import { AppDataSource } from './db-source'
import positionRepository from '../repository/positionRepository'
import dbPosition from './entities/dbPosition'
import Position from '../entities/position'
import mapper from './mappers/position.mapper'

export default class PositionData implements positionRepository {
  async create (seed: number) {
    const x = Math.floor(Math.random() * seed)
    const y = Math.floor(Math.random() * seed)
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
