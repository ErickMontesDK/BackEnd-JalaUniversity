import { Container } from 'inversify'
import SnakeService from '../../../services/snake-services'
import BoxService from '../../../services/box-service'
import GameMechanics from '../../../services/gameMechanics'
import { SnakeDataMock } from './database/snake-data-accessMock'
import { BoxDataMock } from './database/box-data-accessMock'
import { testSnake } from './database/snakeMock'
import testBox from './database/boxMock'
import Snake from '../../../domain/entities/snake'

describe('Unit test for gameMechanics services', () => {
  let gameMechanics: GameMechanics

  beforeAll(async () => {
    const container = new Container()
    container.bind<SnakeDataMock>('SnakeData').to(SnakeDataMock)
    container.bind<SnakeService>('SnakeService').to(SnakeService)
    container.bind<BoxDataMock>('BoxDataAcess').to(BoxDataMock)
    container.bind<BoxService>('BoxService').to(BoxService)
    container.bind<GameMechanics>('GameMechanics').to(GameMechanics)

    gameMechanics = container.get<GameMechanics>('GameMechanics')
  })

  it('Should return All the Data of Snakes from a string array', async () => {
    const arrayWithIds = ['1', '1', '1', '1', '1', '1']
    const dataFromAllSnakes = await gameMechanics.returnAllSnakesInfo(arrayWithIds)
    expect(dataFromAllSnakes.length).toBe(6)
    dataFromAllSnakes.forEach(data => {
      expect(data.id).toBe(1)
    })
  })
  it('Should return true if a Snake eats a food', async () => {
    testSnake.coordX = 5
    testSnake.coordY = 4
    const sendedSnakes = [testSnake]
    testBox.coordX = testSnake.coordX
    testBox.coordY = testSnake.coordY
    const food = testBox
    const doesTheSnakeAteTheFood = await gameMechanics.eatingFood(sendedSnakes, food)

    expect(doesTheSnakeAteTheFood).toBe(true)
  })
  it('Should return true if the snakes collide', async () => {
    const allSnakes = [testSnake, testSnake]
    const responseCollision = await gameMechanics.snakesCollide(allSnakes)

    expect(responseCollision).toBe(true)
  })
  it('Should return false if the snakes dont collide', async () => {
    const testSnake1 = new Snake()
    testSnake1.direction = 'right'
    testSnake1.coordX = 2
    testSnake1.coordY = 2
    testSnake1.length = 1
    testSnake1.tailNodes = ''
    testSnake1.user = 'Dummy'
    testSnake1.id = 6

    const testSnake2 = new Snake()
    testSnake2.direction = 'right'
    testSnake2.coordX = 1
    testSnake2.coordY = 1
    testSnake2.length = 1
    testSnake2.tailNodes = ''
    testSnake2.user = 'Dummy'
    testSnake2.id = 6

    const allSnakes = [testSnake1, testSnake2]
    const responseCollision = await gameMechanics.snakesCollide(allSnakes)

    expect(responseCollision).toBe(false)
  })
})
