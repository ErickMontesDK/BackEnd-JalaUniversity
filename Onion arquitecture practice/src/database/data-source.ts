import { DataSource } from 'typeorm'
import dbUser from './dbUser'

export const UserDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [dbUser],
  migrations: [],
  subscribers: []
})
