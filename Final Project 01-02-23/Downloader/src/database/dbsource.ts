import 'reflect-metadata'
import { DataSource } from 'typeorm'
import FileEntity from './entities/file.entity'
import AccountEntity from './entities/account.entity'
import FileAccountEntity from './entities/file-account.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'ErickDK',
  password: 'killerkiller',
  database: 'downloaderService',
  synchronize: true,
  logging: true,
  entities: [FileEntity, AccountEntity, FileAccountEntity],
  subscribers: [],
  migrations: []
})
