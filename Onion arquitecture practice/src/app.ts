import { UserDataSource } from './database/data-source'
import User from './entities/user'
import { container } from './containers/inversify.config'
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

    const userLoaded = await userAccess.read(13)
    console.log(userLoaded)

    if (userLoaded) {
      userLoaded.lastName = 'Bedolla'
      userAccess.update(userLoaded)
      console.log(userLoaded)
    }
    console.log(await userAccess.delete(15))
  }
}

new Test().initializeDB()
