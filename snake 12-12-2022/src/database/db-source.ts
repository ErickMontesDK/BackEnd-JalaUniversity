import { DataSource } from 'typeorm'
import dbBoard from './entities/dbBoard'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'databse.sqlite',
  synchronize: true,
  logging: false,
  entities: [dbBoard],
  migrations: [],
  subscribers: []
})
