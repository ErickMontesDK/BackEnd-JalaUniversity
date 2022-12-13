import express from 'express'
import { defaultRoute } from './routes'

const app = express()
const port = 3000

app.use(defaultRoute)

app.listen(port, () => console.log(`Server listening on port ${port}`))

// import { AppDataSource } from './database/db-source'
// import PositionData from './database/position-data-access'

// class Test {
//   async initializeDB () {
//     await AppDataSource.initialize()

//     const num = 20

//     const BoardAccess = new PositionData()
//     const meh = await BoardAccess.create(num)
//     console.log(meh)
//   }
// }

// new Test().initializeDB()
