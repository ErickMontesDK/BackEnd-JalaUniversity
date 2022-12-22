import Snake from '../../../domain/entities/snake'
import { movingInDirection } from '../../../infrastructure/utils/movingDirection'
describe('Unit test for moving the direction of the Snakes', () => {
  const defaultParameter:number = 5
  const boardSizeDefault:number = 10
  const testSnake:Snake = new Snake()
  testSnake.id = defaultParameter
  testSnake.coordX = defaultParameter
  testSnake.coordY = defaultParameter
  testSnake.direction = 'right'
  testSnake.length = defaultParameter
  testSnake.tailNodes = ''
  testSnake.user = 'default'

  it('Should update the Snake coordinate X+1 because it goes right', async () => {
    const originalCoordX = testSnake.coordX
    const originalCoordY = testSnake.coordY
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(originalCoordX + 1)
    expect(snakeToRight.coordY).toBe(originalCoordY)
  })
  it('Should update the Snake to first Square in X because it goes right', async () => {
    testSnake.coordX = boardSizeDefault
    const originalCoordY = testSnake.coordY
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(1)
    expect(snakeToRight.coordY).toBe(originalCoordY)
  })
  it('Should update the Snake coordinate X-1 because it goes left', async () => {
    testSnake.coordX = 5
    const originalCoordX = testSnake.coordX
    const originalCoordY = testSnake.coordY
    testSnake.direction = 'left'
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(originalCoordX - 1)
    expect(snakeToRight.coordY).toBe(originalCoordY)
  })
  it('Should update the Snake to last Square in X because it goes left', async () => {
    testSnake.coordX = 1
    testSnake.direction = 'left'
    const originalCoordY = testSnake.coordY
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(boardSizeDefault)
    expect(snakeToRight.coordY).toBe(originalCoordY)
  })
  it('Should update the Snake coordinate Y+1 because it goes up', async () => {
    testSnake.coordY = 5
    const originalCoordX = testSnake.coordX
    const originalCoordY = testSnake.coordY
    testSnake.direction = 'up'
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(originalCoordX)
    expect(snakeToRight.coordY).toBe(originalCoordY + 1)
  })
  it('Should update the Snake to first Square in Y because it goes up', async () => {
    testSnake.coordY = boardSizeDefault
    testSnake.direction = 'up'

    const originalCoordX = testSnake.coordX
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(originalCoordX)
    expect(snakeToRight.coordY).toBe(1)
  })
  it('Should update the Snake coordinate Y-1 because it goes down', async () => {
    testSnake.coordY = 5
    const originalCoordX = testSnake.coordX
    const originalCoordY = testSnake.coordY
    testSnake.direction = 'down'
    const snakeToRight = movingInDirection(testSnake, boardSizeDefault)

    expect(snakeToRight.coordX).toBe(originalCoordX)
    expect(snakeToRight.coordY).toBe(originalCoordY - 1)
  })
})
