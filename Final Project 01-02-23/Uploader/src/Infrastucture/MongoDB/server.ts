import { config } from './config/config'
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const mongoConnection = () => {
    mongoose
      .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
      .then(() => {
        console.log('Connected to Mongo Atlas DB')
      }).catch((error:unknown) => {
        console.log(error)
      })
  }
  
  module.exports = mongoConnection