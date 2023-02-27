import FileEntity from '../database/entities/file.entity'
import { FileRepository } from '../database/repository/file.repository'
import FileAccountService from './file-account.service'
import InfluxDBClient from './influxDb.service'

export default class FileService {
  private fileRepository: FileRepository
  private fileAccountService: FileAccountService
  private InfluxDBservice: InfluxDBClient

  constructor () {
    this.fileRepository = new FileRepository()
    this.fileAccountService = new FileAccountService()
    this.InfluxDBservice = new InfluxDBClient()
  }

  async updateFileFromUploader (File: any) {
    const fileFromDB: FileEntity | undefined = await this.getFileByUploaderId(File.id)
    const fileToUpdate: FileEntity = fileFromDB || new FileEntity()

    fileToUpdate.name = File.name
    fileToUpdate.uploaderId = File.id.toString()
    fileToUpdate.size = File.size
    fileToUpdate.downloadsToday = fileToUpdate.downloadsToday | 0
    fileToUpdate.downloadsTotal = fileToUpdate.downloadsTotal | 0

    const updateFile = await this.fileRepository.updateFile(fileToUpdate)
    this.InfluxDBservice.writePointFile(updateFile, 'update file')
    return updateFile
  }

  async updateFileFromDownloader (File: any) {
    const fileFromDB: FileEntity | undefined = await this.getFileById(File.id)
    const fileToUpdate: FileEntity = fileFromDB || new FileEntity()

    fileToUpdate.downloadsToday = File.downloadsToday | 0
    fileToUpdate.downloadsTotal = File.downloadsTotal | 0

    const updateFile = await this.fileRepository.updateFile(fileToUpdate)
    this.InfluxDBservice.writePointFile(updateFile, 'update file')
    return updateFile
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

    if (foundFile) {
      await this.fileRepository.deleteFile(foundFile.id)
      this.InfluxDBservice.writePointFile(foundFile, 'delete file')
      const fileRelationsWithAccounts = await this.fileAccountService.getRelationstByFileId(foundFile.uploaderId)

      fileRelationsWithAccounts.forEach((relation) => {
        this.fileAccountService.deleteFileAccount(relation.id)
      })
    }
  }

  async dailyUpdateDownloads () {
    this.fileRepository.dailyUpdate()
  }
}
