import { Router } from 'express'
import FileControllers from '../Controller/file.controller'

export const filesRoute = Router()
const fileControllers = new FileControllers()

filesRoute.post('/', async (req, res) => {
  fileControllers.createFile(req, res)
})
filesRoute.get('/:id', async (req, res) => {
  fileControllers.getFileById(req, res)
})
filesRoute.put('/:id', async (req, res) => {
  fileControllers.updateFileById(req, res)
})
filesRoute.delete('/:id', async (req, res) => {
  fileControllers.deleteFileById(req, res)
})
