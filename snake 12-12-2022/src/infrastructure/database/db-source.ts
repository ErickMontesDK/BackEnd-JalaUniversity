import { DataSource } from 'typeorm'
import dbBoard from './entities/dbBoard'
import dbPosition from './entities/dbPosition'
import dbSnake from './entities/dbSnake'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'databse.sqlite',
  synchronize: true,
  logging: false,
  entities: [dbBoard, dbPosition, dbSnake],
  migrations: [],
  subscribers: []
})
