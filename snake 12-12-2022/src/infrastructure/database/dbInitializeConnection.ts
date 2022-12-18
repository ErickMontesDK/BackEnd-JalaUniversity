import { AppDataSource } from './db-source'

export default class ConnectionSQL {
  static async initServerConnection () { await AppDataSource.initialize() }

  static async closeServerConnection () { await AppDataSource.destroy() }
}
