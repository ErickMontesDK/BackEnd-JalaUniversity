import { Request, Router } from 'express'
import FileControllers from '../Controller/file.controller'
import { GridFsStorage } from 'multer-gridfs-storage'

const multer = require('multer')

const storage = new GridFsStorage({
  url: 'mongodb+srv://Admin:killerkiller@uploader.ehxrcgs.mongodb.net/?retryWrites=true&w=majority',
  file: (req:Request, file:any) => {
    return new Promise((resolve) => {
      const filename = file.originalname.trim()
      const fileInfo = {
        filename,
        status: 'replicating'
      }
      resolve(fileInfo)
    })
  }
})
const upload = multer({ storage })

export const filesRoute = Router()
const fileControllers = new FileControllers()

filesRoute.post('/', upload.single('file'), async (req, res) => {
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
