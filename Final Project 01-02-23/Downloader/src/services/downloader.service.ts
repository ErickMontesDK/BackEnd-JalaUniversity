import AccountService from './account.service'
import FileAccountService from './file-account.service'
import FileService from './file.services'
import AccountEntity from '../database/entities/account.entity'
import RabbitMqService from './rabbitmq_service'

export default class DownloaderService {
  private fileAccountService : FileAccountService
  private accountService : AccountService
  private fileService : FileService
  private rabbitService : RabbitMqService

  constructor () {
    this.fileAccountService = new FileAccountService()
    this.accountService = new AccountService()
    this.fileService = new FileService()
    this.rabbitService = new RabbitMqService()
  }

  async getFileLink (fileId: string) {
    const driveAccount = await this.accountService.getOptimizedAccount()
    const relationFileAccount = await this.fileAccountService.getRelationByFileAndAccountId(fileId, driveAccount.uploaderId)
    const fileToDownload = await this.fileService.getFileByUploaderId(fileId)

    if (relationFileAccount && fileToDownload) {
      this.rabbitService.sendMessage(fileToDownload, driveAccount)

      const filterAccounts = await this.accountService.getAllAccountsExceptOne(driveAccount.uploaderId)

      await Promise.all(filterAccounts.map(async (account: AccountEntity) => {
        account.consecutiveDownloads = 0
        return this.accountService.updateAccountByDownloader(account)
      }))

      return {
        'file name': fileToDownload.name,
        'download link': relationFileAccount.downloadLink
      }
    }
    return {
      'file ': 'not found'
    }
  }
}
