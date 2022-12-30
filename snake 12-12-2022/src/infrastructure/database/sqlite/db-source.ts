import { DataSource } from 'typeorm'
import dbBoard from './entities/dbBoard'
import dbBox from './entities/dbBox'
import dbGame from './entities/dbGame'
import dbSnake from './entities/dbSnake'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'databse.sqlite',
  synchronize: true,
  logging: false,
  entities: [dbBoard, dbSnake, dbBox, dbGame],
  migrations: [],
  subscribers: []
})
