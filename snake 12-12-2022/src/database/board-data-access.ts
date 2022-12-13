import { AppDataSource } from './db-source'
import BoardRepository from '../repository/boardRepository'
import dbBoard from './entities/dbBoard'
import Board from '../entities/board'
import mapper from './mappers/board.mapper'

export default class BoardData implements BoardRepository {
  async create (num: number) {
    const board:dbBoard = new Board()
    board.arregloX = num
    board.arregloY = num

    const repository = AppDataSource.getRepository(dbBoard)
    await repository.save(board)

    const skipN = (await repository.find()).length - 1
    const boardCreated = (await repository.find({ skip: skipN }))[0]

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
