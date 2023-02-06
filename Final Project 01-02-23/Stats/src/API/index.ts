import express from 'express'
import { routes } from './routes'

export const app = express()
const initialRoute = '/stats'

app.use(`${initialRoute}`, routes)
