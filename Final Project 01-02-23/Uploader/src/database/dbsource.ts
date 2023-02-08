import 'reflect-metadata'
import { DataSource } from 'typeorm'
import FileEntity from './entities/file.entity'
import dotenv from 'dotenv'
import { resolve } from 'path'
import AccountEntity from './entities/account.entity'

dotenv.config({ path: resolve(__dirname, '../../.env') })

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_CONNECTION as string,
  useNewUrlParser: true,
  synchronize: true,
  useUnifiedTopology: true,
  logging: true,
  ssl: true,
  entities: [FileEntity, AccountEntity]
})
