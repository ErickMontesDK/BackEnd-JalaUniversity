import { app } from './Presentation'

const mongoConnection = require('./infrastucture/MongoDB/server')
const port = process.env.PORT || 4000


mongoConnection()
app.listen(port,() => console.log('Uploader server listening on port ' + port))