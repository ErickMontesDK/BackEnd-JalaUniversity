import { Container } from 'inversify'
import UserService from './services/userServices'
import IUserRepository from './repository/user-repository'
import 'reflect-metadata'

const container = new Container()

container.bind<IUserRepository>('UserService').to(UserService)

export { container }
