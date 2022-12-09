import User from './dbUser'
import IUserRepository from '../repository/user-repository'
import { UserDataSource } from './data-source'
import { injectable } from 'inversify'

@injectable()
export default class UserData implements IUserRepository {
  async create (user: User) {
    const repository = UserDataSource.getRepository(User)
    return await repository.save(user)
  }

  async read (id: number) {
    const repository = UserDataSource.getRepository(User)
    return await repository.findOneBy({ id })
  }

  async update (user: User) {
    const repository = UserDataSource.getRepository(User)
    return await repository.save(user)
  }

  async delete (id: number) {
    const repository = UserDataSource.getRepository(User)
    const userById = await repository.findOneBy({ id })
    if (userById) {
      await repository.delete({ id })
      return `User with id ${id} was deleted`
    } else {
      return `User with id ${id} wasn't found `
    }
  }
}
