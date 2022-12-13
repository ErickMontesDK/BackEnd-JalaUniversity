import express from 'express'
import { defaultRoute } from './routes'
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(defaultRoute)

app.listen(port, () => console.log(`Server listening on port ${port}`))
