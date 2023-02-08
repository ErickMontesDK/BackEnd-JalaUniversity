import amqp = require('amqplib/callback_api');
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(__dirname, '../../../.env') })

export default class RabbitMqService {
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

        const queue = 'Uploader_service'
        channel.assertQueue(queue, { durable: false })

        console.log('Waiting for messages...')

        channel.consume(queue, function (message:any) {
          console.log('message received ' + message!.content.toString())
        }, {
          noAck: true
        })
      })
    })
  }

  senderService = () => {
    this.connecToRabbitMQ().then((connection:any) => {
      connection.createChannel(function (error1:any, channel:any) {
        if (error1) {
          throw error1
        }

        const queue = 'Uploader_service'
        const message = 'Message from uploader'

        channel.assertQueue(queue, { durable: false })

        channel.sendToQueue(queue, Buffer.from(message))

        console.log('message sent: ' + message)
      })

      setTimeout(function () {
        connection.close()
      }, 500)
    })
  }
}
