import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import ISnakeController from '../Controllers/ISnakecontroller'

export const snakeRoutes = Router()
const snakeController = container.get<ISnakeController>('ControllerSnake')

snakeRoutes.post('/snake/create?', async (req, res) => {
  snakeController.createSnake(req, res)
})
snakeRoutes.get('/snake/:id', async (req, res) => {
  snakeController.searchSnake(req, res)
})
snakeRoutes.put('/snake/update/:id?', async (req, res) => {
  snakeController.updateDirection(req, res)
})
snakeRoutes.put('/snake/start/:id/:max', async (req, res) => {
  snakeController.startRunning(req, res)
})
