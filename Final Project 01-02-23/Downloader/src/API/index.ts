import express from 'express'
import { routes } from './routes'

export const app = express()
const initialRoute = '/downloader'

app.use(`${initialRoute}`, routes)
