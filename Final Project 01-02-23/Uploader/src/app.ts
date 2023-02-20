import { app } from './API'
import ConnectionMongo from './database/dbconnection'
import RabbitMqService from './services/rabbitmq_service'
import RabbitMqReceiverService from './services/rabbitmqReceiver.service'
const port = process.env.PORT || 4000
const rabbitService = new RabbitMqService()
const rabbitMqReceiverService = new RabbitMqReceiverService()

ConnectionMongo.initServerConnection()
rabbitService.connecToRabbitMQ().then((connection) => {
  console.log('Connected to RabbitMQ!')
  rabbitMqReceiverService.listeningService()
}).catch((err) => {
  console.error('Error connecting to RabbitMQ:', err)
})

app.listen(port, () => console.log('Uploader server listening on port ' + port))
