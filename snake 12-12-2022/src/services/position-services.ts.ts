import positionRepository from '../repository/positionRepository'
import PositionData from '../database/position-data-access'

export default class PositionService implements positionRepository {
//   userData: IUserRepository = container.get<IUserRepository>('UserData')
  positionData = new PositionData()

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
