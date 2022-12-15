import { AppDataSource } from './db-source'
import IBoardRepository from '../../domain/repository/IBoardRepository'
import dbBoard from './entities/dbBoard'
import { injectable } from 'inversify'
import 'reflect-metadata'
import returnForId from '../utils/returnForId'

@injectable()
export default class BoardData implements IBoardRepository {
  async create (board: dbBoard) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbBoard)
    await repository.save(board)

    const idBoard = await returnForId(repository)
    await AppDataSource.destroy()
    return idBoard
  }

  async read (id: number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbBoard)
    const boardFound = await repository.findOneBy({ id })
    if (boardFound) {
      await AppDataSource.destroy()
      return boardFound
    } else {
      await AppDataSource.destroy()
      return { idBoard: id, state: 'Not found' }
    }
  }

  async delete (id: number) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbBoard)
    const boardById = await repository.findOneBy({ id })
    if (boardById) {
      await repository.delete({ id })
      await AppDataSource.destroy()
      return 'Deleted'
    } else {
      await AppDataSource.destroy()
      return 'Not Found'
    }
  }
}
