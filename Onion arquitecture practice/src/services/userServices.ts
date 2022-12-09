/* eslint-disable no-useless-constructor */
import User from '../entities/user'
import IUserRepository from '../repository/user-repository'
import UserData from '../database/data-access'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserService implements IUserRepository {
  userData: IUserRepository

  constructor (@inject('UserData') userData: UserData) {
    this.userData = userData
  }

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
