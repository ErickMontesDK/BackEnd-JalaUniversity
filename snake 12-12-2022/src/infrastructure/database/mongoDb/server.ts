import { config } from './config/config'
const mongoose = require('mongoose')

const mongoConnection = () => {
  mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
      console.log('Connected to Mongo')
    }).catch((error:unknown) => {
      console.log(error)
    })
}

module.exports = mongoConnection
