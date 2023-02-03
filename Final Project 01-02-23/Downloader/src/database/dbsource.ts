import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Student } from './entities/dbStudent'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: "localhost",
  synchronize: true,
  logging: true,
  ssl: true,
  entities: [Student]
})
