import express from 'express'
import { routes } from './routes'
import { filesRoute } from './routes/file.route'
const bodyParser = require('body-parser')

export const app = express()
const initialRoute = '/downloader'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(`${initialRoute}`, routes)
app.use(`${initialRoute}/files`, filesRoute)
