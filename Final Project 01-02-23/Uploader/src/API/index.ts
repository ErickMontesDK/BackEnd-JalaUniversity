import express from 'express'
import { routes } from './routes'
import { accountRoute } from './routes/account.route'
import { filesRoute } from './routes/files.route'
import errorHandler from '../utils/errorHandler'
const bodyParser = require('body-parser')

export const app = express()
const initialRoute = '/api'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(`${initialRoute}`, routes)
app.use(`${initialRoute}/files`, filesRoute)
app.use(`${initialRoute}/drive-accounts`, accountRoute)
// app.use(errorHandler)
