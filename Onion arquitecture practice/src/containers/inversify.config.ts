import { Container } from 'inversify'
import UserService from '../services/userServices'
import UserData from '../database/data-access'
import IUserRepository from '../repository/user-repository'
import 'reflect-metadata'

const container = new Container()

container.bind<IUserRepository>('UserService').to(UserService)
container.bind<IUserRepository>('UserData').to(UserData)

export { container }
