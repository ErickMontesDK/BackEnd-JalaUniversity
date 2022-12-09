import { UserDataSource } from './database/data-source'
import User from './entities/user'
import { container } from './services/inversify.config'
import IUserRepository from './repository/user-repository'

const UserService = container.get<IUserRepository>('UserService')

class Test {
  async initializeDB () {
    await UserDataSource.initialize()

    const newUser = new User()
    newUser.name = 'Erick'
    newUser.lastName = 'Montes'

    const userAccess = UserService
    await userAccess.create(newUser)

    const userLoaded = await userAccess.read(1)

    if (userLoaded) {
      userLoaded.lastName = 'Bedolla'
      userAccess.update(userLoaded)
      console.log(userLoaded)
    }
    userAccess.delete(8)
  }
}

new Test().initializeDB()
