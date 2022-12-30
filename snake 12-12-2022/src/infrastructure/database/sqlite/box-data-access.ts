import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IBoxRepository from '../../../domain/repository/IBoxRepository'
import dbBox from './entities/dbBox'
import returnForId from '../../utils/returnForId'
import Box from '../../../domain/entities/box'

@injectable()
export default class BoxData implements IBoxRepository {
  protected repository = AppDataSource.getRepository(dbBox)

  async create (newFoodBox: dbBox) {
    await this.repository.save(newFoodBox)

    const idBox = await returnForId(this.repository).toString()
    if (idBox) {
      return { id: idBox, message: 'Created' }
    } else {
      throw new Error('Box was not created')
    }
  }

  async read (id: string) {
    const fixedId = parseInt(id)
    const BoxFound = await this.repository.findOneBy({ id: fixedId })

    if (BoxFound) {
      return BoxFound
    } else {
      throw new Error(`box with id ${id} not found`)
    }
  }

  async update (box: Box) {
    const updateBox = await this.repository.save(box)
    return updateBox
  }
}
