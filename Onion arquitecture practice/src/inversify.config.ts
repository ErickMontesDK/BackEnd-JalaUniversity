import { Container } from 'inversify'
import IUserService from './services/user-service'
import UserService from './services/concrete-user-service'
import User from './entities/user'

const container = new Container()

container.bind<IUserService>('UserService').to(UserService)
container.bind<User>('User').to(User)

export { container }
