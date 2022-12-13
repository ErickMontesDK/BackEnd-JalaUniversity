import BoardRepository from '../repository/boardRepository'
import { container } from '../inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'

@injectable()
export default class BoardService implements BoardRepository {
  boardData : BoardRepository = container.get<BoardRepository>('BoardData')

  async create (num: number) {
    return await this.boardData.create(num)
  }

  async read (id: number) {
    return await this.boardData.read(id)
  }

  async delete (id: number) {
    return await this.boardData.delete(id)
  }
}
