import { app } from './API'
import ConnectionPostgres from './database/dbconnection'
const port = process.env.PORT || 5000

ConnectionPostgres.initServerConnection()
app.listen(port, () => console.log('Downloader server listening on port ' + port))
