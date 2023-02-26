import RabbitMqService from './rabbitmq_service'
import InfluxDBClient from './influxDb.service'

export default class DownloadHandlerService {
  private rabbitService: RabbitMqService
  private influxDB: InfluxDBClient

  constructor (rabbitService: RabbitMqService) {
    this.rabbitService = rabbitService
    this.influxDB = new InfluxDBClient()
  }

  rabbitMqReceiveMessage (newMessage: any) {
    try {
      const { file, account } = newMessage

      account.downloadsTotal += 1
      account.downloadsToday += 1
      account.sizeDownloadTotal += file.size
      account.sizeDownloadsToday += file.size
      account.consecutiveDownloads += 1
      file.downloadsToday += 1
      file.downloadsTotal += 1

      this.rabbitService.sendMessage(file, account)
      this.influxDB.writePoint(file, account)
    } catch (error) {
      console.error('Error in stats when receive data:', error)
    }
  }
}
