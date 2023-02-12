import { Router } from 'express'
import FileControllers from '../Controller/file.controller'

export const filesRoute = Router()
const fileControllers = new FileControllers()

filesRoute.post('/', async (req, res) => {
  fileControllers.createFile(req, res)
})
filesRoute.get('/', async (req, res) => {
  fileControllers.getAllFiles(req, res)
})
filesRoute.get('/:id', async (req, res) => {
  fileControllers.getFileById(req, res)
})
filesRoute.get('/uploader/:id', async (req, res) => {
  fileControllers.getFilesByUploaderId(req, res)
})
