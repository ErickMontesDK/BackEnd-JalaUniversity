import { Container } from 'inversify'
import UserService from './userServices'
import IUserRepository from '../repository/user-repository'
import UserData from '../database/data-access'
import 'reflect-metadata'

const container = new Container()

container.bind<IUserRepository>('UserService').to(UserService)
container.bind<IUserRepository>('UserData').to(UserData)

export { container }
