import { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import FileService from '../../services/file.services'
import { ErrorBuild } from '../../utils/errorBuild'

export default class FileControllers {
  protected fileService: FileService

  constructor () {
    this.fileService = new FileService()
  }

  async createFile (req: Request, res: Response) {
    const fileFromFs: any = req.file
    console.log(fileFromFs)
    // if (!req.file) {
    //   next(ErrorBuild.badRequest('Not file received, please check you file and try again'))
    //   return
    // }
    try {
      const { id, originalname, mimetype, size, uploadDate } = fileFromFs

      const fileValues = {
        gridFsId: id,
        name: originalname,
        mimetype,
        size,
        uploadDate
      }

      const newFile = await this.fileService.uploadingFile(fileValues)

      return res.status(201).json({ message: 'File created successfully.', data: newFile })
    } catch (error) {
      if (error instanceof ErrorBuild) {
        // next(error)
      }
    }
  }

  async getFileById (req: Request, res: Response) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'The File id is required.' })

    try {
      const foundFile = await this.fileService.getFileById(id)

      return res.status(200).json({ file: foundFile, message: 'File found successfully.' })
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(404).json({ message: error.message })
    }
  }

  async updateFileById (req: Request, res: Response) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'The File id is required.' })

    try {
      const fileValues = {
        name: req.body.name || undefined,
        filename: req.body.filename || undefined,
        status: req.body.status || undefined
      }

      const updatedFile = await this.fileService.updateFileById(id, fileValues)

      return res.status(200).json({ data: updatedFile, message: 'File updated successfully.' })
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message })
    }
  }

  async deleteFileById (req: Request, res: Response) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'The File id is required.' })

    try {
      const deletedFile = await this.fileService.deleteFileById(id)

      return res.status(200).json({ id: deletedFile, message: 'File deleted successfully.' })
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message })
    }
  }
}
