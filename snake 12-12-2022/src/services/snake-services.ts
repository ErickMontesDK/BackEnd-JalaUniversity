import { container } from '../infrastructure/inversify/inversify.config'
import 'reflect-metadata'
import { injectable } from 'inversify'
import snakeRepository from '../domain/repository/snakeRepository'

@injectable()
export default class SnakeService implements snakeRepository {
  snakeData: snakeRepository = container.get<snakeRepository>('SnakeData')

  async create (seed: number, player: string) {
    return await this.snakeData.create(seed, player)
  }

  async read (id: number) {
    return await this.snakeData.read(id)
  }

  async delete (id: number) {
    return await this.snakeData.delete(id)
  }
}
