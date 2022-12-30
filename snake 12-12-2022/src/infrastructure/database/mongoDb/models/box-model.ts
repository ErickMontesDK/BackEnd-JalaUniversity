import { Schema, Document, model } from 'mongoose'
import { boxState } from '../../../../domain/types/types'
import Box from '../../../../domain/entities/box'

interface IBoxModel extends Box, Document {
  id: number,
  state: boxState,
  coordX: number,
  coordY:number
}

const BoxSchema: Schema = new Schema({
  state: { type: String, required: true },
  coordX: { type: Number, required: true },
  coordY: { type: Number, required: true }
})
export default model<IBoxModel>('Box', BoxSchema)
