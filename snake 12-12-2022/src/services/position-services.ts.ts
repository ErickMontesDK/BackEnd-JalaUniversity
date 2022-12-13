import positionRepository from '../repository/positionRepository'
import { container } from '../inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'

@injectable()
export default class PositionService implements positionRepository {
  positionData: positionRepository = container.get<positionRepository>('PositionData')

  async create (seed: number) {
    return await this.positionData.create(seed)
  }

  async read (id: number) {
    return await this.positionData.read(id)
  }

  async delete (id: number) {
    return await this.positionData.delete(id)
  }
}
