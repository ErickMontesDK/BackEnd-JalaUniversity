import BoardService from '../../../services/board-services'
import { Container } from 'inversify'
import { BoardDataMock } from './_mocks_/database/board-data-accessMock'
// import IBoardRepository from '../../domain/repository/IBoardRepository'
// import { AppDataSource } from '../../infrastructure/database/db-source'

describe('Unit test for board services', () => {
  let boardServices: BoardService

  beforeAll(async () => {
    const container = new Container()

    container.bind<BoardDataMock>('BoardData').to(BoardDataMock)
    container.bind<BoardService>('BoardService').to(BoardService)
    boardServices = container.get<BoardService>('BoardService')
  })

  it('Should create a board object', async () => {
    const BoardSize = 5
    const returnedMessage = await boardServices.create(BoardSize)

    expect(typeof returnedMessage.id).toBe('number')
    expect(typeof returnedMessage.message).toBe('string')
  })
  it('Should return a board object already created', async () => {
    const BoardId = 1
    const returnedBoard = await boardServices.read(BoardId)

    expect(returnedBoard.id).toBe(BoardId)
    expect(typeof returnedBoard.arregloX).toBe('number')
    expect(typeof returnedBoard.arregloY).toBe('number')
  })
  it('Should delete a board object already created', async () => {
    const BoardId = 1
    const returnedMessage = await boardServices.delete(BoardId)

    expect(returnedMessage.id).toBe(BoardId)
    expect(typeof returnedMessage.id).toBe('number')
    expect(typeof returnedMessage.message).toBe('string')
  })
})
