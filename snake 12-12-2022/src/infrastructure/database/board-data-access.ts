import { AppDataSource } from './db-source'
import IBoardRepository from '../../domain/repository/IBoardRepository'
import dbBoard from './entities/dbBoard'
import { injectable } from 'inversify'
import 'reflect-metadata'
import returnForId from '../utils/returnForId'

@injectable()
export default class BoardData implements IBoardRepository {
  protected repository = AppDataSource.getRepository(dbBoard)

  async create (board: dbBoard) {
    await this.repository.save(board)

    const idBoard = await returnForId(this.repository)

    return { id: idBoard, message: 'Created' }
  }

  async read (id: number) {
    const boardFound = await this.repository.findOneBy({ id })
    if (boardFound) {
      return boardFound
    } else {
      throw new Error('Board not found')
    }
  }

  async delete (id: number) {
    const deleteResponse = await this.repository.delete({ id })
    if (deleteResponse.affected !== 0) {
      return { id, message: 'Board deleted' }
    } else {
      throw new Error('Board not found')
    }
  }
}
