import { Router } from 'express'
import { AppDataSource } from '../infrastructure/database/db-source'
import { container } from '../infrastructure/inversify/inversify.config'
import BoardRepository from '../domain/repository/boardRepository'
import positionRepository from '../domain/repository/positionRepository'
import snakeRepository from '../domain/repository/snakeRepository'

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
defaultRoute.get('/snake?', (req, res) => {
  async function createSnake () {
    if (req.query.user && req.query.seed) {
      await AppDataSource.initialize()
      let numberCorrection = req.query.seed
      numberCorrection = numberCorrection.toString()

      const seed = parseInt(numberCorrection, 10)
      const user = req.query.user.toString()

      const snakeGenerator = container.get<snakeRepository>('SnakeService')
      const newSnake = await snakeGenerator.create(seed, user)

      res.send(newSnake)
      await AppDataSource.destroy()
    } else {
      res.send('Faltan parametros para la snake')
    }
  }
  createSnake()
})
