import { Schema, Document, model } from 'mongoose'
// import mongoose from "mongoose";
import Board from '../../../../domain/entities/board'

interface IBoardModel extends Board, Document {
  id:number,
  arregloX: number;
  arregloY: number;
}

const BoardSchema:Schema = new Schema({
  arregloX: { type: Number, required: true },
  arregloY: { type: Number, required: true }
})
export default model<IBoardModel>('Board', BoardSchema)

// interface IUser extends Document {
//   email: string;
//   firstName: string;
//   lastName: string;
// }

// const UserSchema: Schema = new Schema({
//   email: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true }
// })

// const User: Model<IUser> = model('User', UserSchema)
