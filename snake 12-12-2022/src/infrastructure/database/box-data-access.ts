import { AppDataSource } from './db-source'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IBoxRepository from '../../domain/repository/IBoxRepository'
import returnForId from '../utils/returnForId'
import dbBox from './entities/dbBox'
import Box from '../../domain/entities/box'

@injectable()
export default class BoxData implements IBoxRepository {
  async create (newFoodBox: dbBox) {
    const repository = AppDataSource.getRepository(dbBox)
    await repository.save(newFoodBox)

    const idBox = await returnForId(repository)

    return { id: idBox, message: 'Created' }
  }

  async read (id: number) {
    const repository = AppDataSource.getRepository(dbBox)
    const BoxFound = await repository.findOneBy({ id })
    if (BoxFound) {
      return BoxFound
    } else {
      throw new Error(`box with id ${id} not found`)
    }
  }

  async updatePositionState (id: number, box: Box) {
    const repository = AppDataSource.getRepository(dbBox)
    if (box) {
      await repository.save(box)
      return box
    } else {
      return { id, message: 'Not found' }
    }
  }

  // async FoodIntoTail (id: number, coords: number[]) {
  //   const repository = AppDataSource.getRepository(dbBox)
  //   const boxFound = await repository.findOneBy({ id })
  //   if (boxFound) {
  //     boxFound.coordX = coords[0]
  //     boxFound.coordY = coords[1]

  //     await repository.save(boxFound)
  //     return boxFound
  //   } else {
  //     return { id, message: 'Box Not Found' }
  //   }
  // }

  // async delete (id: number) {
  //   const repository = AppDataSource.getRepository(dbSnake)
  //   const snakeById = await repository.findOneBy({ id })
  //   if (snakeById) {
  //     await repository.delete({ id })

  //     return { id, message: 'Snake deleted' }
  //   } else {
  //     return { id, message: 'Snake not found' }
  //   }
  // }
}
