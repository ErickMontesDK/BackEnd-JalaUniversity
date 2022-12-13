import express from 'express'
import { defaultRoute } from './routes'

const app = express()
const port = 3000

app.use(defaultRoute)

app.listen(port, () => console.log(`Server listening on port ${port}`))

// import { AppDataSource } from './database/db-source'
// import BoardService from './services/board-services'

// class Test {
//   async initializeDB () {
//     await AppDataSource.initialize()

//     const num = 20

//     const BoardAccess = new BoardService()
//     await BoardAccess.create(num)
//   }
// }

// new Test().initializeDB()
