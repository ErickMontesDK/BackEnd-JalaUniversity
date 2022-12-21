import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IBoxRepository from '../../domain/repository/IBoxRepository'
import returnForId from '../utils/returnForId'
import dbBox from './entities/dbBox'
import Box from '../../domain/entities/box'

@injectable()
export default class BoxData implements IBoxRepository {
  protected repository = AppDataSource.getRepository(dbBox)

  async create (newFoodBox: dbBox) {
    await this.repository.save(newFoodBox)

    const idBox = await returnForId(this.repository)

    return { id: idBox, message: 'Created' }
  }

  async read (id: number) {
    const BoxFound = await this.repository.findOneBy({ id })
    if (BoxFound) {
      return BoxFound
    } else {
      throw new Error(`box with id ${id} not found`)
    }
  }

  async updatePositionState (id: number, box: Box) {
    const repository = AppDataSource.getRepository(dbBox)
    if (box) {
      await repository.save(box)
      return box
    } else {
      throw new Error('Box Not found')
    }
  }
}
