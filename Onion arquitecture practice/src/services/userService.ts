import { DeleteResult } from 'typeorm'
import User from '../entities/user'
import IUserRepository from '../repository/user-repository'
import { UserDataSource } from '../database/data-source'

export default class UserService implements IUserRepository<User> {
  async create (user: User): Promise<User> {
    const repository = UserDataSource.getRepository(User)
    return await repository.save(user)
  }

  async read (id: number): Promise<User | null> {
    const repository = UserDataSource.getRepository(User)
    return await repository.findOneBy({ id: id })
  }

  async update (user: User): Promise<User> {
    const repository = UserDataSource.getRepository(User)
    return await repository.save(user)
  }

  async delete (id: number): Promise <DeleteResult> {
    const repository = UserDataSource.getRepository(User)
    return await repository.delete({ id })
  }
}
