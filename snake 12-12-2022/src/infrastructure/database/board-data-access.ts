import { AppDataSource } from './db-source'
import IBoardRepository from '../../domain/repository/IBoardRepository'
import dbBoard from './entities/dbBoard'
import { injectable } from 'inversify'
import 'reflect-metadata'
import returnForId from '../utils/returnForId'

@injectable()
export default class BoardData implements IBoardRepository {
  async create (board: dbBoard) {
    const repository = AppDataSource.getRepository(dbBoard)
    await repository.save(board)

    const idBoard = await returnForId(repository)

    return { id: idBoard, message: 'Created' }
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbBoard)
    const boardFound = await repository.findOneBy({ id })
    if (boardFound) {
      return boardFound
    } else {
      return { id, message: 'Board not found' }
    }
  }

  async delete (id: number) {
    const repository = AppDataSource.getRepository(dbBoard)
    const boardById = await repository.findOneBy({ id })
    if (boardById) {
      await repository.delete({ id })

      return { id, message: 'Snake deleted' }
    } else {
      return { id, message: 'Board not found' }
    }
  }
}
