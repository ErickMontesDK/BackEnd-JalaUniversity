import amqp = require('amqplib/callback_api');
import { resolve } from 'path'
import dotenv from 'dotenv'
import FileEntity from '../database/entities/file.entity'

dotenv.config({ path: resolve(__dirname, '../../../.env') })

export default class RabbitMqService {
  protocol:string
  hostname: string
  port: number
  username: string
  password: string
  connection!: amqp.Connection | null
  channel!: amqp.Channel | null
  downloadQueue: string

  constructor () {
    this.protocol = 'amqp'
    this.hostname = 'localhost'
    this.port = 5672
    this.username = process.env.RABBIT_USER as string
    this.password = process.env.RABBIT_PASSWORD as string
    this.connection = null
    this.channel = null
    this.downloadQueue = 'Downloader_service'
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
          resolve(channel)
        })
      }).catch((err:any) => {
        reject(err)
      })
    })
  }

  sendMessage (file: FileEntity, action: string): void {
    const sentObject = {
      action,
      file
    }

    const messageString = JSON.stringify(sentObject)
    console.log(sentObject)
    this.createChannel().then((channel:any) => {
      channel.sendToQueue(this.downloadQueue, Buffer.from(messageString))
      console.log(`Sent message to queue ${this.downloadQueue}`)
    })
  }
}
