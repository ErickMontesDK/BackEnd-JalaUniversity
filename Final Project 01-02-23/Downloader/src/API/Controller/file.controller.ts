import { Request, Response, NextFunction } from 'express'
import FileEntity from '../../database/entities/file.entity'
import FileService from './../../services/file.services'
import { ErrorBuild } from '../../utils/errorBuild'

export default class FileControllers {
  protected fileService: FileService

  constructor () {
    this.fileService = new FileService()
  }

  async createFile (req: Request, res: Response, next: NextFunction) {
    const { name, status, size, contentLinks, uploaderId } = req.body
    if (!name || !status || !size || !contentLinks || !uploaderId) {
      next(ErrorBuild.badRequest('One or more parameters were not send. (name, status, size, contentLinks or uploaderId)'))
      return
    }

    try {
      const fileValues = new FileEntity()
      fileValues.name = name
      fileValues.status = status
      fileValues.size = parseInt(size)
      fileValues.contentLinks = contentLinks
      fileValues.uploaderId = uploaderId

      const newFileId = await this.fileService.createFileById(fileValues)
      res.status(201).json({ message: 'File created', id: newFileId })
    } catch (error) {
      next(error)
    }
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
