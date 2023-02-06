import { app } from './API'
import RabbitMqService from './rabbitService'

const port = process.env.PORT || 6000

const service = new RabbitMqService()
service.listeningService()

app.listen(port, () => console.log('Stats server listening on port ' + port))
