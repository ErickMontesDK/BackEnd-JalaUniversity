import { Router } from 'express'

export const routes = Router()

routes.get('/', (req, res) => {
    res.send('Welcome Downloader server')
})