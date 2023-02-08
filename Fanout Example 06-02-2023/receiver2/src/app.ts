import amqp = require('amqplib/callback_api');

amqp.connect(
  {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'ErickDK',
    password: 'killerkiller'
  }, function (err, connection) {
    if (err) {
      throw err
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }
      const exchange = 'fanout_exchange'
      const queue = 'queue_2'

      channel.assertQueue(queue, { durable: false })
      channel.assertExchange(exchange, 'fanout', { durable: false })

      channel.bindQueue(queue, exchange, '')

      console.log('Waiting for messages...')

      channel.consume(queue, function (message: any) {
        console.log(`Receiver2 get a message: ${message.content.toString()}`)
      }, {
        noAck: true
      })
    })
  }
)
