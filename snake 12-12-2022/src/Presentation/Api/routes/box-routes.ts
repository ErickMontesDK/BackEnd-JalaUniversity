import { Router } from 'express'
import IBoxController from '../Controllers/IBoxController'
import { container } from '../../../infrastructure/inversify/inversify.config'

export const boxRoutes = Router()
const boxController = container.get<IBoxController>('BoxController')

boxRoutes.post('/create/limit/:max', async (req, res) => {
  boxController.createSnake(req, res)
})
boxRoutes.get('/:id', async (req, res) => {
  boxController.searchById(req, res)
})
boxRoutes.put('/update/:id/:coordx/:coordy', async (req, res) => {
  boxController.turnIntoTail(req, res)
})
