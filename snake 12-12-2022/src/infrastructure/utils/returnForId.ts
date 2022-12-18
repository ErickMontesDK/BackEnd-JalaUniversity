import { Repository } from 'typeorm'
import dbBoard from '../database/entities/dbBoard'
import dbSnake from '../database/entities/dbSnake'
import dbBox from '../database/entities/dbBox'

export default async function returnForId (repository:Repository<dbBoard | dbSnake | dbBox>):Promise<number> {
  const skipN = (await repository.find()).length - 1
  const boardCreated = (await repository.find({ skip: skipN }))[0]
  return boardCreated.id
}
