import { app } from './API'
import ConnectionPostgres from './database/dbconnection'
import RabbitMqService from './services/rabbitmq_service'
const port = process.env.PORT || 5000
const rabbitService = new RabbitMqService()

rabbitService.listeningService()
ConnectionPostgres.initServerConnection()
app.listen(port, () => console.log('Downloader server listening on port ' + port))
