import { Router } from 'express'
import DownloadController from '../Controller/download.controller'

export const downloaderRoute = Router()
const downloadController = new DownloadController()

downloaderRoute.get('/files/:id', async (req, res, next) => {
  downloadController.getFileLink(req, res, next)
})
