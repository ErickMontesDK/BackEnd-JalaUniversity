import FileEntity, { driveInfo } from './../database/entities/file.entity'
import { FileRepository } from '../database/repository/file.repository'
import DriveServices from './drive.services'
import { ObjectID } from 'mongodb'
import AccountService from './account.services'
import RabbitMqService from './rabbitmq_service'

interface FileValues {
  name?: string,
  filename?: string,
  status?: string,
  size?: number,
  mimetype?: string,
  driveFile?: driveInfo[]
}

export default class FileService {
  protected fileRepository: FileRepository
  protected accountService: AccountService
  protected rabbitService: RabbitMqService

  constructor () {
    this.fileRepository = new FileRepository()
    this.accountService = new AccountService()
    this.rabbitService = new RabbitMqService()
  }

  async uploadingFile (idGridFile:ObjectID, fileValues: FileValues) {
    const todayDate = new Date()
    const day = todayDate.getUTCDate()
    const month = todayDate.getUTCMonth()
    const year = todayDate.getUTCFullYear()

    const newfile = new FileEntity()
    newfile.name = fileValues.name!
    newfile.filename = `${year}-${month}-${day}-${fileValues.name}`
    newfile.status = 'replicating'
    newfile.size = fileValues.size!
    newfile.mimetype = fileValues.mimetype!
    newfile.driveFile = []

    const fileFromMongo = await this.fileRepository.createFile(newfile)
    this.uploadToDriveAccounts(idGridFile, fileFromMongo)
    return fileFromMongo
  }

  async uploadToDriveAccounts (idFileFromFs: ObjectID, fileObject: FileEntity) {
    const fileFromGridFS: Buffer = await this.fileRepository.getFileFromGridFS(idFileFromFs)

    const accounts = await this.accountService.getAllAccounts()
    const driveFile = []

    for (const account of accounts) {
      const driveService = new DriveServices(account)
      const response = await driveService.uploadFile(fileFromGridFS, fileObject)
      const urlFile = await driveService.generatePublicUrl(response.id)

      const driveInfo = {
        accountId: account.id,
        contentLink: urlFile.data.webContentLink,
        driveId: response.id
      }
      driveFile.push(driveInfo)
    }

    const updateFile = fileObject
    updateFile.driveFile = driveFile
    updateFile.status = 'uploaded'

    this.updateFileById(fileObject.id.toString(), updateFile)
  }

  async getFileById (id: string) {
    return await this.fileRepository.readFile(id)
  }

  async updateFileById (id: string, fileValues: FileValues) {
    const updateFile = await this.getFileById(id)

    updateFile.name = fileValues.name ? fileValues.name : updateFile.name
    updateFile.filename = fileValues.filename ? fileValues.filename : updateFile.filename
    updateFile.driveFile = fileValues.driveFile ? fileValues.driveFile : updateFile.driveFile
    updateFile.status = fileValues.status ? fileValues.status : updateFile.status

    const updatedFile = await this.fileRepository.updateFile(updateFile)
    this.sendToRabbit(updateFile, 'update')
    return updatedFile
  }

  async deleteFileById (id: string) {
    const file = await this.getFileById(id)

    file.driveFile.forEach(async (drive) => {
      const account = await this.accountService.getAccountById(drive.accountId.toString())
      if (account) {
        const driveService = new DriveServices(account)

        await driveService.deleteFile(drive.driveId)
      }
    })
    this.sendToRabbit(file, 'delete')
    return await this.fileRepository.deleteFile(id)
  }

  sendToRabbit (file: FileEntity, action: string) {
    this.rabbitService.sendMessage(file, action)
  }
}
