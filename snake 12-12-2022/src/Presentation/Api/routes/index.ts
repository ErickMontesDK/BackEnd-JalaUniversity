/* eslint-disable eqeqeq */
import { Router } from 'express'

export const defaultRoute = Router()

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
})
