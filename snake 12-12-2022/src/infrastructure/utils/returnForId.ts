import { Repository } from 'typeorm'
import dbBoard from '../database/entities/dbBoard'
import dbSnake from '../database/entities/dbSnake'

export default async function returnForId (repository:Repository<dbBoard | dbSnake>):Promise<number> {
  const skipN = (await repository.find()).length - 1
  const boardCreated = (await repository.find({ skip: skipN }))[0]
  return boardCreated.id
}
