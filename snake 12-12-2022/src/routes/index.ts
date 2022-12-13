import { Router } from 'express'
import { AppDataSource } from '../database/db-source'
import { container } from '../inversify/inversify.config'
import BoardRepository from '../repository/boardRepository'
import positionRepository from '../repository/positionRepository'

export const defaultRoute = Router()

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
})
defaultRoute.get('/create/:elements', (req, res) => {
  async function createBoard () {
    await AppDataSource.initialize()
    const number = parseFloat(req.params.elements)
    const boardGenerator = container.get<BoardRepository>('BoardService')
    const newBoard = await boardGenerator.create(number)
    res.send(newBoard)
    await AppDataSource.destroy()
  }

  createBoard()
})
defaultRoute.get('/position/:seed', (req, res) => {
  async function getPosition () {
    await AppDataSource.initialize()
    const number = parseFloat(req.params.seed)
    const positionGenerator = container.get<positionRepository>('PositionService')
    const newPosition = await positionGenerator.create(number)
    res.send(newPosition)
    await AppDataSource.destroy()
  }

  getPosition()
})
