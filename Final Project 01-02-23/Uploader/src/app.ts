import { app } from './API'
import ConnectionMongo from './database/dbconnection'
const port = process.env.PORT || 4000

ConnectionMongo.initServerConnection()

app.listen(port, () => console.log('Uploader server listening on port ' + port))
