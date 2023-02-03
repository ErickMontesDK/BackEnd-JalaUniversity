import { app } from './API'
import ConnectionMongo from './database/dbconnection'
import amqp = require('amqplib/callback_api');
const port = process.env.PORT || 4000

ConnectionMongo.initServerConnection()


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

app.listen(port,() => console.log('Uploader server listening on port ' + port))