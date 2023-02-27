import { app } from './API'
import ConnectionMongo from './database/dbconnection'
import RabbitMqService from './services/rabbitmq_service'
const port = process.env.PORT || 4000
const rabbitService = new RabbitMqService()

ConnectionMongo.initServerConnection()
rabbitService.connecToRabbitMQ().then((connection) => {
  console.log('Connected to RabbitMQ!')
  rabbitService.listeningService()
}).catch((err) => {
  console.error('Error connecting to RabbitMQ:', err)
})

app.listen(port, () => console.log('Uploader server listening on port ' + port))
