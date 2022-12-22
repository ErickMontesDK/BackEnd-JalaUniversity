import { AppDataSource } from '../../../infrastructure/database/db-source'
import { container } from '../../../infrastructure/inversify/inversify.config'
import Box from '../../../domain/entities/box'
import IBoxRepository from '../../../domain/repository/IBoxRepository'

describe('Unit test for board data access', () => {
  const boxDataAccess = container.get<IBoxRepository>('BoxDataAcess')
  const testCoordParameter = 3

  const testBox = new Box()
  testBox.coordX = testCoordParameter
  testBox.coordY = testCoordParameter
  testBox.state = 'food'
  testBox.TailNode = 0

  beforeAll(async () => {
    await AppDataSource.initialize()
  })
  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('Should create a Box Object in the database and return "Created" message', async () => {
    const returnBoardFromDB = await boxDataAccess.create(testBox)

    expect(returnBoardFromDB).toHaveProperty('id')
    expect(returnBoardFromDB).toHaveProperty('message')
    expect(typeof returnBoardFromDB.id).toBe('number')
    expect(typeof returnBoardFromDB.message).toBe('string')
  })
  it('Should return an Board Object from the database with a specific id', async () => {
    const boxCreatedInDB = await boxDataAccess.create(testBox)
    const idNewBoxInDB = boxCreatedInDB.id
    const returnBoxFromDB = await boxDataAccess.read(idNewBoxInDB)

    expect(returnBoxFromDB.coordX).toBe(testCoordParameter)
    expect(returnBoxFromDB.coordY).toBe(testCoordParameter)
    expect(returnBoxFromDB.id).toBe(idNewBoxInDB)
    expect(returnBoxFromDB.state).toBe('food')
  })
  it('Should return an Error if it didnt find an id', async () => {
    try {
      const idInvalidId = 0
      await boxDataAccess.read(idInvalidId)
    } catch (err:unknown) {
      expect(err instanceof Error).toBe(true)
    }
  })
  it('Should update a Box object with a specific Id', async () => {
    const boxCreatedInDB = await boxDataAccess.create(testBox)
    const idNewBoxInDB = boxCreatedInDB.id
    const returnBoxFromDB = await boxDataAccess.read(idNewBoxInDB)
    returnBoxFromDB.coordX++
    returnBoxFromDB.coordY++
    returnBoxFromDB.state = 'snake'

    const updateBoxFromDB = await boxDataAccess.update(returnBoxFromDB)

    expect(updateBoxFromDB.coordX).toBe(returnBoxFromDB.coordX++)
    expect(updateBoxFromDB.coordY).toBe(returnBoxFromDB.coordY++)
    expect(updateBoxFromDB.id).toBe(returnBoxFromDB.id)
    expect(updateBoxFromDB.state).toBe(returnBoxFromDB.state)
  })
})
