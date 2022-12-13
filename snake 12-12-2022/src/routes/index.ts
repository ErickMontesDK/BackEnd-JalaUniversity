import { Router } from 'express'
import BoardService from '../services/board-services'
import { AppDataSource } from '../database/db-source'
// import BoardService from './services/board-services'

export const defaultRoute = Router()

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
})
defaultRoute.get('/create/:elements', (req, res) => {
  async function initializeDB () {
    await AppDataSource.initialize()
    const number = parseFloat(req.params.elements)
    const boardGenerator = new BoardService()
    const newBoard = await boardGenerator.create(number)
    res.send(newBoard)
  }

  initializeDB()
})
