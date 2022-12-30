import { injectable } from 'inversify'
import 'reflect-metadata'
import ISnakeRepository from '../../../domain/repository/ISnakeRepository'
import Snake from '../../../domain/entities/snake'
import SnakeModel from './models/snake-model'

@injectable()
export default class SnakeData implements ISnakeRepository {
  async create (newSnake: Snake) {
    if (newSnake) {
      const snakeReturned = new SnakeModel(newSnake)
      const snakeReturnedMongo = await snakeReturned.save()

      return { id: snakeReturnedMongo.id.toString(), message: 'Snake created' }
    } else {
      throw new Error('Box was not created')
    }
  }

  async read (id: string) {
    const SnakeFound = await SnakeModel.findById(id)

    if (SnakeFound) {
      return SnakeFound
    } else {
      throw new Error(`snake with id ${id} not found`)
    }
  }

  async update (snake: Snake) {
    const id = snake.id
    const updateSnake = await SnakeModel.findById(id)
    if (updateSnake) {
      const response = await updateSnake.set(snake)
      return response.save()
    } else {
      throw new Error(`snake with id ${id} not found`)
    }
  }

  async delete (id: string) {
    const deleteResponse = await SnakeModel.findByIdAndDelete(id)

    if (deleteResponse) {
      return { id, message: 'Board deleted' }
    } else {
      throw new Error('Board not found')
    }
  }

  async readBestScores () {
    const scoreResponse = await SnakeModel.find().sort({ length: -1 }).limit(5)

    if (scoreResponse) {
      return scoreResponse
    } else {
      throw new Error('Could not find Scores')
    }
  }
}
