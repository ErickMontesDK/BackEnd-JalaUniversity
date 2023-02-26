import RabbitMqService from './rabbitmq_service'

export default class DownloadHandlerService {
  private rabbitService: RabbitMqService

  constructor (rabbitService: RabbitMqService) {
    this.rabbitService = rabbitService
  }

  rabbitMqReceiveMessage (newMessage: any) {
    const { file, account } = newMessage

    if (account && file) {
      account.downloadsTotal += 1
      account.downloadsToday += 1
      account.sizeDownloadTotal += file.size
      account.sizeDownloadsToday += file.size
      account.consecutiveDownloads += 1

      file.downloadsToday += 1
      file.downloadsTotal += 1

      console.log(account, file)
      this.rabbitService.sendMessage(file, account)
    }
  }
}
