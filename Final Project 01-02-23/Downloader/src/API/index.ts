import express from 'express'
import { routes } from './routes'
import { filesRoute } from './routes/file.route'
import errorHandler from '../utils/errorHandler'
import { downloaderRoute } from './routes/downloader.route'
import { accountStatsRoute } from './routes/accountStats.route'
const bodyParser = require('body-parser')

export const app = express()
const initialRoute = '/downloader'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(`${initialRoute}`, routes)
app.use(`${initialRoute}/files`, filesRoute)
app.use(`${initialRoute}/balance`, downloaderRoute)
app.use(`${initialRoute}/account-stats`, accountStatsRoute)
app.use(errorHandler)
