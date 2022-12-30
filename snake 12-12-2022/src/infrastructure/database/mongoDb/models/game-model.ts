import { Schema, Document, model } from 'mongoose'
import { gameState } from '../../../../domain/types/types'
import Game from '../../../../domain/entities/game'

interface IGameModel extends Game, Document {
  id: number,
  coordX: number,
  coordY:number,
  gameState: gameState,
  idBoard: string,
  idSnakes: string,
  idFood:string
}

const GameSchema: Schema = new Schema({
  coordX: { type: Number },
  coordY: { type: Number },
  gameState: { type: String, require: true },
  idBoard: { type: String },
  idSnakes: { type: String },
  idFood: { type: String }
})
export default model<IGameModel>('Game', GameSchema)
