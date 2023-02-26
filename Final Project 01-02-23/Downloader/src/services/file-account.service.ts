import FileAccountEntity from '../database/entities/file-account.entity'
import { FileAccountRepository } from '../database/repository/file-account.repository'

export default class FileAccountService {
  private fileAccountRepository : FileAccountRepository

  constructor () {
    this.fileAccountRepository = new FileAccountRepository()
  }

  async handlerFileAccounts (messageFile: any) {
    const accountsInfo = messageFile.driveFile

    accountsInfo.forEach((account:any) => {
      this.updateFileAccount(account, messageFile.id)
    })
  }

  async updateFileAccount (accountInfo:any, fileId:any) {
    const fileAccountFromDb: FileAccountEntity | undefined = await this.getRelationByFileAndAccountId(fileId.toString(), accountInfo.accountId.toString())
    console.log(accountInfo.accountId.toString(), fileId, fileAccountFromDb)
    const fileAccountToUpdate: FileAccountEntity = fileAccountFromDb || new FileAccountEntity()

    fileAccountToUpdate.accountId = accountInfo.accountId.toString()
    fileAccountToUpdate.fileId = fileId.toString()
    fileAccountToUpdate.downloadLink = accountInfo.contentLink

    return await this.fileAccountRepository.updateFileAccount(fileAccountToUpdate)
  }

  async getRelationByFileAndAccountId (fileId:string, accountId:string) {
    return await this.fileAccountRepository.readFileAccountByFileAndAccountId(fileId, accountId)
  }

  async getRelationstByAccountId (id:string) {
    return await this.fileAccountRepository.readFileAccountByAccountId(id)
  }

  async getRelationstByFileId (id:string) {
    return await this.fileAccountRepository.readFileAccountByFileId(id)
  }

  async getRelationstById (id:string) {
    return await this.fileAccountRepository.readFileAccountByFileId(id)
  }

  async deleteFileAccount (id:string) {
    return await this.fileAccountRepository.deleteFileAccount(id)
  }
}
