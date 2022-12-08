import { UserDataSource } from './database/data-source'
import UserService from './services/userService'
import User from './entities/user'

class Running {
  async initializeDB () {
    await UserDataSource.initialize()

    const newUser = new User('Erick', 'Montes')
    const userAccess = new UserService()
    await userAccess.create(newUser)

    const userLoaded = await userAccess.read(1)

    if (userLoaded) {
      userLoaded.changeLastname = 'Bedolla'
      userAccess.update(userLoaded)
      console.log(userLoaded)
    }
    userAccess.delete(2)
  }
}

new Running().initializeDB()
