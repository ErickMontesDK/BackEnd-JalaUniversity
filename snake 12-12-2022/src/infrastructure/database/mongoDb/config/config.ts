import dotenv from 'dotenv'
dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@snake0.vn0eqa1.mongodb.net/?retryWrites=true&w=majority`

const SERVER_POT = process.env.SERVER_POT ? Number(4000) : 4004

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_POT
  }
}
