import { Repository } from 'typeorm'
import dbBoard from '../database/entities/dbBoard'
import dbSnake from '../database/entities/dbSnake'
import dbBox from '../database/entities/dbBox'
import dbGame from '../database/entities/dbGame'

export default async function returnForId (repository:Repository<dbBoard | dbSnake | dbBox | dbGame>):Promise<number> {
  const skipN = (await repository.find()).length - 1
  const boardCreated = (await repository.find({ skip: skipN }))[0]
  return boardCreated.id
}
