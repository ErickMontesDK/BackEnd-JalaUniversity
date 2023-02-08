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
      const message = 'hello world'

      channel.assertExchange(exchange, 'fanout', { durable: false })

      channel.publish(exchange, '', Buffer.from(message))

      console.log(`Service sent message: ${message}`)
    })
  }
)
