import { Request, Response, NextFunction } from 'express'
import FileService from './../../services/file.services'
import { ErrorBuild } from '../../utils/errorBuild'

export default class FileControllers {
  protected fileService: FileService

  constructor () {
    this.fileService = new FileService()
  }

  async getAllFiles (req: Request, res: Response, next: NextFunction) {
    const files = await this.fileService.getAllFiles()

    res.status(200).json({ message: 'Files found', data: files })
  }

  async getFileById (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }
    try {
      const fileLinks = await this.fileService.getFileById(id)
      res.status(200).json({ message: 'File found', data: fileLinks })
    } catch (error) {
      next(error)
    }
  }

  async getFilesByUploaderId (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }
    try {
      const fileLinks = await this.fileService.getFileByUploaderId(id)
      res.status(200).json({ message: 'File found', data: fileLinks })
    } catch (error) {
      next(error)
    }
  }
}
