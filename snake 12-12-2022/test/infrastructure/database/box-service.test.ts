import Box from '../../../src/domain/entities/box'
import BoxData from '../../../src/infrastructure/database/box-data-access'
import { AppDataSource } from '../../../src/infrastructure/database/db-source'
import { boxState } from '../../../src/domain/types/types'

describe('Unit test for box data accese', () => {
  const testBox = new Box()
  const state:boxState = 'food'
  testBox.coordX = 3
  testBox.coordY = 7
  testBox.state = state
  testBox.TailNode = 0

  beforeAll(async () => {
    await AppDataSource.initialize()
  })
  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('Should create a object in the database', async () => {
    const boxData = new BoxData()
    const response = await boxData.create(testBox)
    expect(typeof response.id).toBe('number')
    expect(response.message).toBe('Created')
  })
  it('Should return the box object from the database with the id: 1', async () => {
    const boxData = new BoxData()
    const id = 1
    const response = await boxData.read(id)
    expect(response).toMatchObject(testBox)
  })
  it('Should not find a box object from the database with the id: 100000', async () => {
    const boxData = new BoxData()
    const id = 100000
    const response = await boxData.read(id)
    expect(response).toEqual({ id: 100000, message: 'Not found' })
  })
  it('Should replace its position constantly', async () => {
    const boxData = new BoxData()
    const id = 1
    let coords = [5, 6]
    const response = await boxData.FoodIntoTail(id, coords)
    expect(response).not.toMatchObject(testBox)
    testBox.coordX = coords[0]
    testBox.coordY = coords[1]
    expect(response).toMatchObject(testBox)
    coords = [3, 7]
    await boxData.FoodIntoTail(id, coords)
  })
  it('Should not find a box object', async () => {
    const boxData = new BoxData()
    const id = 10000
    const coords = [5, 6]
    const response = await boxData.FoodIntoTail(id, coords)
    expect(response).toEqual({ id: 10000, message: 'Box Not Found' })
  })
})
