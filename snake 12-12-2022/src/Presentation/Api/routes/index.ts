/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import ISnakeController from '../Controllers/ISnakecontroller'

export const defaultRoute = Router()
const snakeController = container.get<ISnakeController>('ControllerSnake')

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
})
defaultRoute.get('/scores', (req, res) => {
  snakeController.searchBestScores(req, res)
})
