import { Request, Response } from 'express'
import FileEntity from '../../database/entities/file.entity'
import FileService from './../../services/file.services'

export default class FileControllers {
  protected fileService: FileService

  constructor () {
    this.fileService = new FileService()
  }

  async createFile (req: Request, res: Response) {
    const { name, status, size, contentLinks, uploaderId } = req.body
    if (!name || !status || !size || !contentLinks || !uploaderId) {
      throw new Error('meh')
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
      return error
    }
  }

  async getAllFiles (req: Request, res: Response) {
    const files = await this.fileService.getAllFiles()

    res.status(200).json({ message: 'Files found', data: files })
  }

  async getFileById (req: Request, res: Response) {
    const id = req.params.id
    if (!id) {
      throw new Error('meh')
    }
    try {
      const fileLinks = await this.fileService.getFileById(id)
      res.status(200).json({ message: 'File found', data: fileLinks })
    } catch (error) {
      return error
    }
  }

  async getFilesByUploaderId (req: Request, res: Response) {
    const id = req.params.id
    if (!id) {
      throw new Error('meh')
    }
    try {
      const fileLinks = await this.fileService.getFileByUploaderId(id)
      res.status(200).json({ message: 'Account found', data: fileLinks })
    } catch (error) {
      return error
    }
  }
}
