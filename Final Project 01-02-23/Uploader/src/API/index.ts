import express from 'express'
import { routes } from './routes'

export const app = express()
const initialRoute = '/uploader'

app.use(`${initialRoute}`, routes)