/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import ISnakeController from '../Controllers/ISnakecontroller'

export const snakeRoutes = Router()
const snakeController = container.get<ISnakeController>('ControllerSnake')

snakeRoutes.get('/create/snake?', async (req, res) => {
  snakeController.createSnake(req, res)
})
snakeRoutes.get('/update/snake/:id?', async (req, res) => {
  snakeController.updateDirection(req, res)
})
snakeRoutes.get('/snake/:id/start/', async (req, res) => {
  snakeController.startRunning(req, res)
})
snakeRoutes.get('/search/snake/:id', async (req, res) => {
  snakeController.searchSnake(req, res)
})
