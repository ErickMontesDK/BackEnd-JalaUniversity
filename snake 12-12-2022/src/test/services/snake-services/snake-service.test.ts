import { Container } from 'inversify'
import SnakeService from '../../../services/snake-services'

import { direction } from '../../../domain/types/types'
import { SnakeDataMock } from './_mocks_/database/snake-data-accessMock'
import { testSnake } from './_mocks_/database/snakeMock'

describe('Unit test for snakes services', () => {
  let snakeService: SnakeService

  beforeAll(async () => {
    const container = new Container()

    container.bind<SnakeDataMock>('SnakeData').to(SnakeDataMock)
    container.bind<SnakeService>('SnakeService').to(SnakeService)
    snakeService = container.get<SnakeService>('SnakeService')
  })

  it('Should create a snake object', async () => {
    const boardSize = 10
    const player = 'Erick'
    const returnedMessage = await snakeService.create(boardSize, player)

    expect(typeof returnedMessage.id).toBe('number')
    expect(typeof returnedMessage.message).toBe('string')
  })
  it('Should return a Snake object', async () => {
    const id = 10
    const directions:direction[] = ['up', 'down', 'left', 'right']
    const returnedSnake = await snakeService.read(id)

    expect(returnedSnake.id).toBe(id)
    expect(typeof returnedSnake.coordX).toBe('number')
    expect(typeof returnedSnake.coordY).toBe('number')
    expect(directions).toContain(returnedSnake.direction)
    expect(returnedSnake.length).toBe(1)
    expect(returnedSnake.tailNodes).toBe('')
    expect(typeof returnedSnake.user).toBe('string')
  })
  it('Should return a list of best Scores', async () => {
    const returnedScores = await snakeService.getBestScores()

    expect(returnedScores.length).toBe(5)
  })
  it('Should update the direction of a specific snake', async () => {
    const id = 5
    const newDirection = 'down'
    const returnedSnake = await snakeService.updateDirection(id, newDirection)

    expect(returnedSnake.id).toBe(id)
    expect(returnedSnake.direction).toEqual(newDirection)
  })
  it('Should update the length of a specific snake and add the food into its tailNodes', async () => {
    const id = 5
    const NodeId = '5'
    const originalSnakeLenght = testSnake.length
    const returnedSnake = await snakeService.updateLength(id, NodeId)

    expect(returnedSnake.id).toBe(id)
    expect(returnedSnake.length).toBe(originalSnakeLenght + 1)
    expect(returnedSnake.tailNodes).toBe(`${NodeId}`)
  })
  it('Should reset its lenght and and tail Nodes', async () => {
    const id = 5
    const boardSize = 10
    const returnedSnake = await snakeService.resetInitialValues(id, boardSize)

    expect(returnedSnake.id).toBe(id)
    expect(returnedSnake.coordX).toBeLessThanOrEqual(boardSize)
    expect(returnedSnake.coordY).toBeLessThanOrEqual(boardSize)
    expect(returnedSnake.length).toBe(1)
    expect(returnedSnake.tailNodes).toBe('')
  })
  it('Should delete a specific Snake Object', async () => {
    const id = 1
    const returnesMessage = await snakeService.delete(id)

    expect(returnesMessage.id).toBe(id)
    expect(typeof returnesMessage.message).toBe('string')
  })
})
