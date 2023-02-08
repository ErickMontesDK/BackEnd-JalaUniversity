import { app } from './API'
import RabbitMqService from './services/rabbitmq_service'

const port = process.env.PORT || 6000

const service = new RabbitMqService()
service.listeningService()

app.listen(port, () => console.log('Stats server listening on port ' + port))
