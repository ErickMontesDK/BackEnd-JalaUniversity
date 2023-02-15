import { Router } from 'express'
import FileControllers from '../Controller/file.controller'

export const filesRoute = Router()
const fileControllers = new FileControllers()

filesRoute.get('/', async (req, res, next) => {
  fileControllers.getAllFiles(req, res, next)
})
filesRoute.get('/:id', async (req, res, next) => {
  fileControllers.getFileById(req, res, next)
})
filesRoute.get('/uploader/:id', async (req, res, next) => {
  fileControllers.getFilesByUploaderId(req, res, next)
})
