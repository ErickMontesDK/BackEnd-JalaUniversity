import BoardRepository from '../repository/boardRepository'
import BoardData from '../database/board-data-access'

export default class BoardService implements BoardRepository {
//   userData: IUserRepository = container.get<IUserRepository>('UserData')
  boardData = new BoardData()

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
