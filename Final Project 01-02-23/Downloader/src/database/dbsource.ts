import 'reflect-metadata'
import { DataSource } from 'typeorm'
import FileEntity from './entities/file.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'ErickDK',
  password: 'killerkiller',
  database: 'downloaderService',
  synchronize: true,
  logging: true,
  entities: [FileEntity],
  subscribers: [],
  migrations: []
})
