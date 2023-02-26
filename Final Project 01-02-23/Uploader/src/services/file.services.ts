import FileEntity, { driveInfo } from './../database/entities/file.entity'
import { FileRepository } from '../database/repository/file.repository'
import DriveServices from './drive.services'
import { ObjectID } from 'typeorm'
import AccountService from './account.services'
import RabbitMqService from './rabbitmq_service'
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

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
    newfile.gridFsId = idGridFile.toString()

    const fileFromMongo = await this.fileRepository.createFile(newfile)
    this.rabbitService.sendMessage(fileFromMongo, 'upload drive', 'uploader')
    return fileFromMongo
  }

  async uploadToDriveAccounts (fileObject: FileEntity) {
    const fileFromGridFS: Buffer = await this.fileRepository.getFileFromGridFS(fileObject.gridFsId)

    const driveFile = fileObject.driveFile.map((drive) => {
      const driveFile: driveInfo = {
        accountId: new ObjectId(drive.accountId),
        contentLink: drive.contentLink,
        driveId: drive.driveId
      }
      return driveFile
    })

    let accounts = await this.accountService.getAllAccounts()

    if (driveFile.length > 0) {
      accounts = accounts.filter((account) => {
        return !fileObject.driveFile.some((driveFile) => {
          const driveFileElement = driveFile.accountId.toString()
          return driveFileElement === account.id.toString()
        })
      })
    }

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
    this.rabbitService.sendMessage(updateFile, 'update file', 'downloader')

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

    const deleteFile = await this.fileRepository.deleteFile(id)
    this.rabbitService.sendMessage(id, 'delete file', 'downloader')
    return deleteFile
  }

  async deleteAccountFromFile (file: FileEntity, accountId: ObjectID) {
    const index = file.driveFile.findIndex((info: driveInfo) => {
      console.log(info.accountId, accountId, info.accountId.toString() === accountId.toString())
      return info.accountId.toString() === accountId.toString()
    })
    console.log(index)
    if (index !== -1) {
      file.driveFile.splice(index, 1)

      this.updateFileById(file.id.toString(), file)
    }
  }

  async getAllFiles () {
    return await this.fileRepository.readAll()
  }
}
