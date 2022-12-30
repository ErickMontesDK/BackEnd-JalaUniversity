
import { injectable } from 'inversify'
import 'reflect-metadata'
import IBoxRepository from '../../../domain/repository/IBoxRepository'

import Box from '../../../domain/entities/box'
import BoxModel from './models/box-model'

@injectable()
export default class BoxData implements IBoxRepository {
  async create (newFoodBox: Box) {
    if (newFoodBox) {
      const newFood = new BoxModel(newFoodBox)
      const newFoodBoxReturned = await newFood.save()

      return { id: newFoodBoxReturned.id.toString(), message: 'Box created' }
    } else {
      throw new Error('Box was not created')
    }
  }

  async read (id: string) {
    const BoxFound = await BoxModel.findById(id)

    if (BoxFound) {
      return BoxFound
    } else {
      throw new Error(`box with id ${id} not found`)
    }
  }

  async update (box: Box) {
    const id = box.id
    const updateBox = await BoxModel.findById(id)
    if (updateBox) {
      const response = await updateBox.set(box)
      return response.save()
    } else return box
  }
}
