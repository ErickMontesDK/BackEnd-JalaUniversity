import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IBoardRepository from '../../../domain/repository/IBoardRepository'
import dbBoard from './entities/dbBoard'
import returnForId from '../../utils/returnForId'

@injectable()
export default class BoardData implements IBoardRepository {
  protected repository = AppDataSource.getRepository(dbBoard)

  async create (board: dbBoard) {
    await this.repository.save(board)
    const idBoard = await returnForId(this.repository).toString()

    if (idBoard) {
      return { id: idBoard, message: 'Created' }
    } else {
      throw new Error('Board was not created')
    }
  }

  async read (id: string) {
    const fixedId = parseInt(id)
    const boardFound = await this.repository.findOneBy({ id: fixedId })

    if (boardFound) {
      return boardFound
    } else {
      throw new Error('Board not found')
    }
  }

  async delete (id: string) {
    const fixedId = parseInt(id)
    const deleteResponse = await this.repository.delete({ id: fixedId })

    if (deleteResponse.affected !== 0) {
      return { id, message: 'Board deleted' }
    } else {
      throw new Error('Board not found')
    }
  }
}
