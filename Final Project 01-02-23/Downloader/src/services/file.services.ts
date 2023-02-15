import FileEntity from '../database/entities/file.entity'
import { FileRepository } from '../database/repository/file.repository'

export default class FileService {
  private fileRepository: FileRepository
  constructor () {
    this.fileRepository = new FileRepository()
  }

  async createFileById (newFile: any) {
    const contentLinks = newFile.driveFile.map((entry:any) => {
      return entry.contentLink
    })
    const formatFile = new FileEntity()
    formatFile.name = newFile.name
    formatFile.status = newFile.status
    formatFile.size = newFile.size
    formatFile.contentLinks = contentLinks
    formatFile.uploaderId = newFile.id.toString()

    const newEntry = await this.fileRepository.createFile(formatFile)
    console.log(newEntry)
  }

  async getAllFiles () {
    return await this.fileRepository.readAllFiles()
  }

  async getFileById (id:string) {
    return await this.fileRepository.readFileById(id)
  }

  async getFileByUploaderId (id:string) {
    return await this.fileRepository.readFileByUploaderId(id)
  }

  async deleteFile (id:string) {
    const foundFile = await this.getFileByUploaderId(id)
    const deletedFile = await this.fileRepository.deleteFile(foundFile.id)
    console.log(deletedFile)
  }
}
