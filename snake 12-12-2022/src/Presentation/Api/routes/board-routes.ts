/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../../../infrastructure/inversify/inversify.config'
import BoardService from '../../../services/board-services'

export const boardRoutes = Router()
const boardGenerator = container.get<BoardService>('BoardService')

boardRoutes.get('/board', async (req, res) => {
  res.send('brinca la tablita')
})
boardRoutes.get('/create/board/:elements', async (req, res) => {
  const newBoard = await boardGenerator.create(req.params.elements)
  res.send(newBoard)
})
