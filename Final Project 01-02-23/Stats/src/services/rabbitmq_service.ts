import amqp = require('amqplib/callback_api');
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, './../../.env') })

export default class rabbitMqService {
  protocol:string
  hostname: string
  port: number
  username: string
  password: string

  constructor () {
    this.protocol = 'amqp'
    this.hostname = 'localhost'
    this.port = 5672
    this.username = process.env.RABBIT_USER as string
    this.password = process.env.RABBIT_PASSWORD as string
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

  listeningService = () => {
    this.connecToRabbitMQ().then((connection:any) => {
      connection.createChannel(function (error1:any, channel:any) {
        if (error1) {
          throw error1
        }

        channel.assertQueue('Uploader_service', { durable: false })
        channel.assertQueue('Downloader_service', { durable: false })

        console.log('Waiting for messages...')

        channel.consume('Uploader_service', function (message:any) {
          console.log('Received from Uploader ' + message!.content.toString())
        }, {
          noAck: true
        })

        channel.consume('Downloader_service', function (message:any) {
          console.log('Received from Downloader ' + message!.content.toString())
        }, {
          noAck: true
        })
      })
    })
  }
}
