import express from 'express'
import { routes } from './routes'
import { accountRoute } from './routes/account.route'
import { filesRoute } from './routes/files.route'
const bodyParser = require('body-parser')

export const app = express()
const initialRoute = '/uploader'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(`${initialRoute}`, routes)
app.use(`${initialRoute}/files`, filesRoute)
app.use(`${initialRoute}/accounts`, accountRoute)
