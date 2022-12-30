import { AppDataSource } from './infrastructure/database/sqlite/db-source'
import { app } from './Presentation/Api'
const bodyParser = require('body-parser')

const port = process.env.PORT || 4000
const mongoConnection = require('./infrastructure/database/mongoDb/server')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

AppDataSource.initialize()
mongoConnection()

app.listen(port, () => console.log(`Server listening on port ${port}`))
