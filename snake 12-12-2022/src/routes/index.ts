/* eslint-disable eqeqeq */
import { Router } from 'express'
import { container } from '../infrastructure/inversify/inversify.config'
import BoardService from '../services/board-services'
import snakeService from '../domain/repository/snakeService'
import { direction } from '../domain/types'

export const defaultRoute = Router()

const boardGenerator = container.get<BoardService>('BoardService')
const snakeGenerator = container.get<snakeService>('SnakeService')

defaultRoute.get('/', (req, res) => {
  res.send('Snake game')
})
defaultRoute.get('/create/:elements', async (req, res) => {
  const newBoard = await boardGenerator.create(req.params.elements)
  res.send(newBoard)
})
defaultRoute.get('/snake/:id?', async (req, res) => {
  if (req.query.move && req.params.id) {
    const number = req.params.id.toString()
    const id = parseInt(number)
    const move = req.query.move.toString()

    const directions:direction[] = ['down', 'up', 'left', 'right']

    directions.forEach(async (direction) => {
      if (direction == move) {
        const msg = await snakeGenerator.updateDirection(id, direction)
        res.send(msg)
      }
    })
  }
})
defaultRoute.get('/snake?', async (req, res) => {
  if (req.query.seed && req.query.user) {
    let numberCorrection = req.query.seed
    numberCorrection = numberCorrection.toString()
    const seed = parseInt(numberCorrection, 10)

    let player = req.query.user
    player = player.toString()

    const newSnake = await snakeGenerator.create(seed, player)
    res.send(newSnake)
  }
})
