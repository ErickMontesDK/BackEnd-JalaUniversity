import express from 'express'
import { defaultRoute } from './routes'
import { boardRoutes } from './routes/board-routes'
import { snakeRoutes } from './routes/snake-routes'
import { boxRoutes } from './routes/box-routes'

export const app = express()
const initialRoute = '/snakeapi'
app.use(`${initialRoute}`, defaultRoute)
app.use(`${initialRoute}/snake`, snakeRoutes)
app.use(`${initialRoute}/board`, boardRoutes)
app.use(`${initialRoute}/box`, boxRoutes)
