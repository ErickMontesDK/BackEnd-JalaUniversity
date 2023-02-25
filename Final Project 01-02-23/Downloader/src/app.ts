import { app } from './API'
import ConnectionPostgres from './database/dbconnection'
import RabbitMqService from './services/rabbitmq_service'
import StartDailyUpdateTask from './services/dailyUpdate.service'

const dailyUpdate = new StartDailyUpdateTask()
const port = process.env.PORT || 5000
const rabbitService = new RabbitMqService()

rabbitService.listeningService()
ConnectionPostgres.initServerConnection()
dailyUpdate.setScheduleUpdate()
app.listen(port, () => console.log('Downloader server listening on port ' + port))
