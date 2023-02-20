import amqp = require('amqplib/callback_api');
import { resolve } from 'path'
import dotenv from 'dotenv'
import UploadHandlerService from './uploadHandler.service'

dotenv.config({ path: resolve(__dirname, '../../../.env') })

export default class RabbitMqReceiverService {
  private uploadHandlerService : UploadHandlerService
  protocol:string
  hostname: string
  port: number
  username: string
  password: string
  connection!: amqp.Connection | null
  channel!: amqp.Channel | null
  downloadQueue: string
  uploaderQueue: string

  constructor () {
    this.uploadHandlerService = new UploadHandlerService()

    this.protocol = 'amqp'
    this.hostname = 'localhost'
    this.port = 5672
    this.username = process.env.RABBIT_USER as string
    this.password = process.env.RABBIT_PASSWORD as string
    this.connection = null
    this.channel = null
    this.downloadQueue = 'Downloader_service'
    this.uploaderQueue = 'Uploader_service'
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
          channel.assertQueue(this.uploaderQueue, { durable: false })
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

      channel.consume(this.uploaderQueue, (message:any) => {
        const receivedObj = JSON.parse(message.content.toString())

        this.uploadHandlerService.rabbitMqReceiveMessage(receivedObj)
      }, {
        noAck: true
      })
    })
  }
}
