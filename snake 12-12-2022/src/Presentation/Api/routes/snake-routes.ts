import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import ISnakeController from '../Controllers/ISnakecontroller'

export const snakeRoutes = Router()
const snakeController = container.get<ISnakeController>('ControllerSnake')

snakeRoutes.post('/create?', async (req, res) => {
  snakeController.createSnake(req, res)
})
snakeRoutes.get('/:id', async (req, res) => {
  snakeController.searchById(req, res)
})
snakeRoutes.put('/update/:id?', async (req, res) => {
  snakeController.updateDirection(req, res)
})
snakeRoutes.put('/start/:id/:max', async (req, res) => {
  snakeController.startRunning(req, res)
})
snakeRoutes.put('/grow/:id/:node', async (req, res) => {
  snakeController.growingTail(req, res)
})
snakeRoutes.delete('/delete/:id', async (req, res) => {
  snakeController.deleteById(req, res)
})
