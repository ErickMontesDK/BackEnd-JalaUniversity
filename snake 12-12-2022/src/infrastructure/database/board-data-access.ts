import { AppDataSource } from './db-source'
import BoardRepository from '../../domain/repository/boardRepository'
import dbBoard from './entities/dbBoard'
import mapper from './mappers/board.mapper'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export default class BoardData implements BoardRepository {
  async create (board: dbBoard) {
    await AppDataSource.initialize()
    const repository = AppDataSource.getRepository(dbBoard)
    await repository.save(board)

    const skipN = (await repository.find()).length - 1
    const boardCreated = (await repository.find({ skip: skipN }))[0]
    await AppDataSource.destroy()
    return mapper.toEntity(boardCreated)
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbBoard)
    return await repository.findOneBy({ id })
  }

  async delete (id: number) {
    const repository = AppDataSource.getRepository(dbBoard)
    const boardById = await repository.findOneBy({ id })
    if (boardById) {
      await repository.delete({ id })
      return `Board with id ${id} was deleted`
    } else {
      return `Board with id ${id} was not found `
    }
  }
}
