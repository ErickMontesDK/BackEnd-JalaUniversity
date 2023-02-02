import { app } from './Presentation'

const port = process.env.PORT || 6000

app.listen(port,() => console.log('Stats server listening on port ' + port))