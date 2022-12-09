import User from '../entities/user'
import IUserRepository from '../repository/user-repository'
import { injectable } from 'inversify'
import { container } from '../containers/inversify.config'

@injectable()
export default class UserService implements IUserRepository {
  userData: IUserRepository = container.get<IUserRepository>('UserData')

  async create (user: User) {
    const repository = await this.userData.create(user)
    return repository
  }

  async read (id: number) {
    const repository = await this.userData.read(id)
    return repository
  }

  async update (user: User) {
    const repository = this.userData.update(user)
    return repository
  }

  async delete (id: number) {
    const repository = this.userData.delete(id)
    return repository
  }
}
