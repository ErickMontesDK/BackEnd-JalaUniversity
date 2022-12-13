import { Router } from 'express'
import BoardService from '../services/board-services'
import { AppDataSource } from '../database/db-source'
import PositionService from '../services/position-services.ts'

export const defaultRoute = Router()

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
  async function initializeDB () {
    await AppDataSource.initialize()
  }
  initializeDB()
})
defaultRoute.get('/create/:elements', (req, res) => {
  async function createBoard () {
    const number = parseFloat(req.params.elements)
    const boardGenerator = new BoardService()
    const newBoard = await boardGenerator.create(number)
    res.send(newBoard)
  }

  createBoard()
})
defaultRoute.get('/position/:seed', (req, res) => {
  async function getPosition () {
    const number = parseFloat(req.params.seed)
    const positionGenerator = new PositionService()
    const newPosition = await positionGenerator.create(number)
    res.send(newPosition)
  }

  getPosition()
})
