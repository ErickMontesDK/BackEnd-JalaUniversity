import FileEntity from '../database/entities/file.entity'
import { FileRepository } from '../database/repository/file.repository'

export default class FileService {
  private fileRepository: FileRepository
  constructor () {
    this.fileRepository = new FileRepository()
  }

  async createFileById (newFile: FileEntity) {
    return await this.fileRepository.createFile(newFile)
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
}
