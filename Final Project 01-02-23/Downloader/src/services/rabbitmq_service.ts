import amqp = require('amqplib/callback_api');
import dotenv from 'dotenv'
import { resolve } from 'path'
import FileService from './file.services'
import UploadHandlerService from './UploadHandlerService'
import AccountService from './account.service'
import FileEntity from '../database/entities/file.entity'
import AccountEntity from '../database/entities/account.entity'

dotenv.config({ path: resolve(__dirname, './../../.env') })

export default class RabbitMqService {
  protected fileService: FileService
  protected accountService: AccountService

  protected uploadHandlerService: UploadHandlerService

  protocol:string
  hostname: string
  port: number
  username: string
  password: string
  connection!: amqp.Connection | null
  channel!: amqp.Channel | null
  downloadQueue: string
  statsDownloaderQueue: string
  downloaderStatsQueue: string

  constructor () {
    this.fileService = new FileService()
    this.accountService = new AccountService()
    this.uploadHandlerService = new UploadHandlerService()
    this.protocol = 'amqp'
    this.hostname = 'localhost'
    this.port = 5672
    this.username = process.env.RABBIT_USER as string
    this.password = process.env.RABBIT_PASSWORD as string
    this.connection = null
    this.channel = null
    this.downloadQueue = 'Downloader_service'
    this.downloaderStatsQueue = 'Downloader_to_stats'
    this.statsDownloaderQueue = 'Stats_to_downloader'
  }

  connecToRabbitMQ () {
    return new Promise((resolve, reject) => {
      amqp.connect({
        protocol: this.protocol,
        hostname: this.hostname,
        port: this.port,
        username: this.username,
        password: this.password
      }, function (err, connection) {
        if (err) {
          reject(err)
        }
        resolve(connection)
      })
    })
  }

  createChannel () {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        resolve(this.channel)
      }

      this.connecToRabbitMQ().then((connection:any) => {
        connection.createChannel((err:any, channel:any) => {
          if (err) {
            reject(err)
            return
          }
          this.channel = channel
          channel.assertQueue(this.downloadQueue, { durable: false })
          channel.assertQueue(this.statsDownloaderQueue, { durable: false })

          resolve(channel)
        })
      }).catch((err:any) => {
        reject(err)
      })
    })
  }

  listeningService = () => {
    this.createChannel().then((channel:any) => {
      console.log('Waiting for messages...')

      channel.consume(this.downloadQueue, (message:any) => {
        const receivedObj = JSON.parse(message.content.toString())

        this.uploadHandlerService.rabbitMqReceiveMessage(receivedObj)
      }, {
        noAck: true
      })

      channel.consume(this.statsDownloaderQueue, (message:any) => {
        const receivedObj = JSON.parse(message.content.toString())
        const { file, account } = receivedObj

        this.fileService.updateFileFromDownloader(file)
        this.accountService.updateAccountByDownloader(account)
      }, {
        noAck: true
      })
    })
  }

  sendMessage (file:FileEntity, account: AccountEntity): void {
    const sentObject = {
      file,
      account
    }

    const messageString = JSON.stringify(sentObject)
    this.createChannel().then((channel:any) => {
      channel.sendToQueue(this.downloaderStatsQueue, Buffer.from(messageString))
      console.log(`Sent message to queue ${this.downloaderStatsQueue}`)
    })
  }
}
