import { Request, Router } from 'express'
import FileControllers from '../Controller/file.controller'
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({ path: resolve(__dirname, '../../.env') })

const multer = require('multer')
const storage = new GridFsStorage({
  url: `${process.env.MONGO_CONNECTION}`,
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

filesRoute.post('/', upload.single('file'), async (req, res, next) => {
  fileControllers.createFile(req, res, next)
})
filesRoute.get('/:id', async (req, res, next) => {
  fileControllers.getFileById(req, res, next)
})
filesRoute.put('/:id', async (req, res, next) => {
  fileControllers.updateFileById(req, res, next)
})
filesRoute.delete('/:id', async (req, res, next) => {
  fileControllers.deleteFileById(req, res, next)
})
