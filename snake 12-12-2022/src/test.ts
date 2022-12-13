import BoardData from './database/board-data-access'
import { AppDataSource } from './database/db-source'

class Test {
  async initializeDB () {
    await AppDataSource.initialize()

    const num = 15

    const BoardAccess = new BoardData()
    const newb = await BoardAccess.create(num)

    console.log(newb)
  }
}

new Test().initializeDB()
