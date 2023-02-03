import { app } from './API'
import amqp = require('amqplib/callback_api');


const port = process.env.PORT || 6000

amqp.connect(
    {
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'admin',
      password: '12345'
    }, function (err, connection) {
      if (err) {
        throw err
      }
      console.log(connection)
    }
  )

app.listen(port,() => console.log('Stats server listening on port ' + port))