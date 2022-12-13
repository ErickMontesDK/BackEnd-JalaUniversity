import { AppDataSource } from './db-source'
import positionRepository from '../repository/positionRepository'
import dbPosition from './entities/dbPosition'
import Position from '../entities/position'
import mapper from './mappers/position.mapper'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export default class PositionData implements positionRepository {
  async create (seed: number) {
    let counter = 1
    let prevRand = 1

    const rand = (max:number) => {
      const time = new Date().getTime()
      const randValue = ((time / counter) / (prevRand + 1)) % max
      counter++
      prevRand = randValue
      const ifString = randValue.toString()
      return parseInt(ifString)
    }

    const x = rand(seed)
    const y = rand(seed)
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
