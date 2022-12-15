import EventLog from '../eventlog'
import ILogRepository from '../interfaces/ILogRepository'

export default class LogRepository implements ILogRepository {
  Insert (element: EventLog) { }
}
