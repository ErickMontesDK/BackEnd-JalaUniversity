import Board from '../../../src/domain/entities/board'
import IBoardRepository from '../../../src/domain/repository/IBoardRepository'
import { AppDataSource } from '../../../src/infrastructure/database/db-source'
import { container } from '../../../src/infrastructure/inversify/inversify.config'

describe('Unit test for board data access', () => {
  const boardDataAccess = container.get<IBoardRepository>('BoardData')

  const testBoard = new Board()
  testBoard.arregloX = 5
  testBoard.arregloY = 5

  beforeAll(async () => {
    await AppDataSource.initialize()
  })
  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('Should create a Board Object in the database and return "Created" message', async () => {
    const returnBoardFromDB = await boardDataAccess.create(testBoard)

    expect(returnBoardFromDB).toHaveProperty('id')
    expect(returnBoardFromDB).toHaveProperty('message')
    expect(typeof returnBoardFromDB.id).toBe('number')
    expect(typeof returnBoardFromDB.message).toBe('string')
  })
  it('Should return an Board Object from the database with a specific id', async () => {
    const boardCreatedInDB = await boardDataAccess.create(testBoard)
    const idNewBoardInDB = boardCreatedInDB.id
    const returnBoardFromDB = await boardDataAccess.read(idNewBoardInDB)

    expect(returnBoardFromDB.arregloX).toBe(5)
    expect(returnBoardFromDB.arregloY).toBe(5)
    expect(returnBoardFromDB.id).toBe(idNewBoardInDB)
  })
  it('Should return an Error if it didnt find an id', async () => {
    try {
      const idInvalidId = 0
      await boardDataAccess.read(idInvalidId)
    } catch (err:unknown) {
      expect(err instanceof Error).toBe(true)
    }
  })
  it('Should delete an Board Object from the database with a specific id', async () => {
    const boardCreatedInDB = await boardDataAccess.create(testBoard)
    const idNewBoardInDB = boardCreatedInDB.id
    const returnBoardFromDB = await boardDataAccess.delete(idNewBoardInDB)

    expect(returnBoardFromDB.id).toBe(idNewBoardInDB)
    expect(returnBoardFromDB.message).toBe('Board deleted')
  })
  it('Delete method should return an Error if it didnt find an id', async () => {
    try {
      const idInvalidId = 0
      await boardDataAccess.delete(idInvalidId)
    } catch (err:unknown) {
      expect(err instanceof Error).toBe(true)
    }
  })
})
