/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../infrastructure/inversify/inversify.config'
import BoardService from '../services/board-services'
import snakeService from '../domain/repository/snakeService'
import { direction } from '../domain/types'
import translateToDirection from '../domain/utils/translateToDirection'

export const defaultRoute = Router()

const boardGenerator = container.get<BoardService>('BoardService')
const snakeGenerator = container.get<snakeService>('SnakeService')

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
})
defaultRoute.get('/create/board/:elements', async (req, res) => {
  const newBoard = await boardGenerator.create(req.params.elements)
  res.send(newBoard)
})
defaultRoute.get('/create/snake?', async (req, res) => {
  if (req.query.seed && req.query.user) {
    const seed = parseInt(req.query.seed as string)

    const player = req.query.user.toString()

    const newSnake = await snakeGenerator.create(seed, player)
    res.send(newSnake)
  }
})
defaultRoute.get('/update/snake/:id?', async (req, res) => {
  if (req.query.direction && req.params.id) {
    const id = parseInt(req.params.id as string)
    const move = req.query.direction.toString()

    const direction:direction = translateToDirection(move)
    const msg = await snakeGenerator.updateDirection(id, direction)
    res.send(msg)
  }
})
defaultRoute.get('/snake/:id/start/', async (req, res) => {
  const id = parseInt(req.params.id as string)

  const updateSnake = await snakeGenerator.updateMovement(id)
  res.send(updateSnake)
})
defaultRoute.get('/search/snake/:id', async (req, res) => {
  const id = parseInt(req.params.id as string)

  const updateSnake = await snakeGenerator.read(id)
  res.send(updateSnake)
})
