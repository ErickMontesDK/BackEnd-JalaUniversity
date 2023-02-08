import { app } from './API'
import RabbitMqService from './services/rabbitmq_service'
const port = process.env.PORT || 5000

const service = new RabbitMqService()

service.senderService()

app.listen(port, () => console.log('Downloader server listening on port ' + port))
