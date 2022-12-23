import 'reflect-metadata'
import { injectable } from 'inversify'
import testBox from './boxMock'
import IBoxRepository from '../../../../../domain/repository/IBoxRepository'
import dbBox from '../../../../../infrastructure/database/entities/dbBox'
import Box from '../../../../../domain/entities/box'

@injectable()
export class BoxDataMock implements IBoxRepository {
  private createMock: jest.Mock
  private readMock: jest.Mock
  private updateMock: jest.Mock

  constructor () {
    this.createMock = jest.fn()
    this.readMock = jest.fn()
    this.updateMock = jest.fn()
  }

  async create (newFoodBox: dbBox) {
    this.createMock(newFoodBox)
    const newId = testBox.id + 1
    return { id: newId, message: 'mock return' }
  }

  async read (id: number) {
    this.readMock(id)
    return testBox
  }

  async update (box: Box) {
    this.updateMock(box)
    return box
  }
}
