import { DataSource } from 'typeorm'
import User from '../entities/user'

export const UserDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: []
})
