import { Schema, Document, model } from 'mongoose'
import { direction } from '../../../../domain/types/types'
import Snake from '../../../../domain/entities/snake'

interface ISnakeModel extends Snake, Document {
  id: number,
  coordX: number,
  coordY:number,
  user: string,
  direction: direction,
  tailNodes: string
}

const SnakeSchema: Schema = new Schema({
  coordX: { type: Number, required: true },
  coordY: { type: Number, required: true },
  length: { type: Number, required: true },
  user: { type: String, require: true },
  direction: { type: String, required: true },
  tailNodes: { type: String, required: false }
})
export default model<ISnakeModel>('Snake', SnakeSchema)
