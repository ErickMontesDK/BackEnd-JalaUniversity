/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import IGameController from '../Controllers/IGameController'

export const gameRoutes = Router()
const gameGenerator = container.get<IGameController>('GameController')

// gameRoutes.get('/:id', async (req, res) => {
//   gameGenerator.searchById(req, res)
// })
gameRoutes.post('/create/elements?', async (req, res) => {
  gameGenerator.createGame(req, res)
})
// boardRoutes.delete('/delete/:id', async (req, res) => {
//   boardGenerator.deleteById(req, res)
// })