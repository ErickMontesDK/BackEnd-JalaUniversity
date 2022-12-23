import { Container } from 'inversify'
import BoxService from '../../../services/box-service'
import { BoxDataMock } from './_mocks_/database/box-data-accessMock'

describe('Unit test for box services', () => {
  let boxServices: BoxService

  beforeAll(async () => {
    const container = new Container()

    container.bind<BoxDataMock>('BoxDataAcess').to(BoxDataMock)
    container.bind<BoxService>('BoxService').to(BoxService)
    boxServices = container.get<BoxService>('BoxService')
  })

  it('Should create a box object', async () => {
    const BoardSize = 5
    const returnedMessage = await boxServices.create(BoardSize)

    expect(typeof returnedMessage.id).toBe('number')
    expect(typeof returnedMessage.message).toBe('string')
  })
  it('Should return a box object', async () => {
    const boxId = 1
    const returnedBox = await boxServices.read(boxId)

    expect(returnedBox.id).toBe(boxId)
    expect(typeof returnedBox.coordX).toBe('number')
    expect(typeof returnedBox.coordY).toBe('number')
    expect(returnedBox.state).toBe('food')
  })
  it('Should update a box object', async () => {
    const boxId = 1
    const newCoords = [3, 3]
    const returnedBox = await boxServices.updateToTail(boxId, newCoords)

    expect(returnedBox.id).toBe(boxId)
    expect(returnedBox.coordX).toBe(newCoords[0])
    expect(returnedBox.coordY).toBe(newCoords[1])
    expect(returnedBox.state).toBe('snake')
  })
})
