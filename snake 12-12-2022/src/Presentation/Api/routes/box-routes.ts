import { Router } from 'express'
import IBoxController from '../Controllers/IBoxController'
import { container } from '../../../infrastructure/inversify/inversify.config'

export const boxRoutes = Router()
const boxController = container.get<IBoxController>('BoxController')

boxRoutes.post('/create/limit/:max', async (req, res) => {
  boxController.createSnake(req, res)
})
// snakeRoutes.get('/:id', async (req, res) => {
//   snakeController.searchById(req, res)
// })
// snakeRoutes.put('/update/:id?', async (req, res) => {
//   snakeController.updateDirection(req, res)
// })
// snakeRoutes.put('/start/:id/:max', async (req, res) => {
//   snakeController.startRunning(req, res)
// })
// snakeRoutes.delete('/delete/:id', async (req, res) => {
//   snakeController.deleteById(req, res)
// })
