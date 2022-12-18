import { AppDataSource } from './infrastructure/database/db-source'
import { app } from './Presentation/Api'
const bodyParser = require('body-parser')

const port = 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

AppDataSource.initialize()

app.listen(port, () => console.log(`Server listening on port ${port}`))
