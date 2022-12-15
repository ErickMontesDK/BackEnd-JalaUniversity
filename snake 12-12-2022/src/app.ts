import express from 'express'
import { defaultRoute } from './Presentation/Api/routes'
import { boardRoutes } from './Presentation/Api/routes/board-routes'
import { snakeRoutes } from './Presentation/Api/routes/snake-routes'
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(defaultRoute)
app.use(boardRoutes)
app.use(snakeRoutes)

app.listen(port, () => console.log(`Server listening on port ${port}`))
