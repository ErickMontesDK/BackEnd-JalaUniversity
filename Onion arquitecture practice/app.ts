import { UserDataSource } from './src/database/data-source'
import User from './src/entities/user'
import { container } from './src/containers/inversify.config'
import IUserRepository from './src/repository/user-repository'

const UserService = container.get<IUserRepository>('UserService')

class Test {
  async initializeDB () {
    await UserDataSource.initialize()

    const newUser = new User()
    newUser.name = 'Erick'
    newUser.lastName = 'Montes'

    const userAccess = UserService
    await userAccess.create(newUser)

    const userLoaded = await userAccess.read(3)
    console.log(userLoaded)

    if (userLoaded) {
      userLoaded.lastName = 'Bedolla'
      userAccess.update(userLoaded)
      console.log(userLoaded)
    }
    console.log(await userAccess.delete(9))
  }
}

new Test().initializeDB()
