import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { Student } from './entities/dbStudent'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: "mongodb+srv://Admin:killerkiller@uploader.ehxrcgs.mongodb.net/?retryWrites=true&w=majority",
  useNewUrlParser: true,
  synchronize: true,
  useUnifiedTopology: true,
  logging: true,
  ssl: true,
  entities: [Student]
})
