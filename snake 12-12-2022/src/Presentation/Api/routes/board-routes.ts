/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import IBoardController from '../Controllers/IBoardController'

export const boardRoutes = Router()
const boardGenerator = container.get<IBoardController>('BoardController')

boardRoutes.get('/board/:id', async (req, res) => {
  boardGenerator.searchById(req, res)
})
boardRoutes.post('/board/create/:elements', async (req, res) => {
  boardGenerator.createBoard(req, res)
})
boardRoutes.delete('/board/delete/:id', async (req, res) => {
  boardGenerator.deleteById(req, res)
})
