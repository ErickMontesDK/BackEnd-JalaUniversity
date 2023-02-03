import { AppDataSource } from './dbsource'

export default class ConnectionMongo {
  static async initServerConnection () { await AppDataSource.initialize() }

  static async closeServerConnection () { await AppDataSource.destroy() }
}