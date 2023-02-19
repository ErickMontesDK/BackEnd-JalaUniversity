import AccountService from './account.service'
import FileAccountService from './file-account.service'
import FileService from './file.services'
import AccountEntity from '../database/entities/account.entity'

export default class DownloaderService {
  private fileAccountService : FileAccountService
  private accountService : AccountService
  private fileService : FileService

  constructor () {
    this.fileAccountService = new FileAccountService()
    this.accountService = new AccountService()
    this.fileService = new FileService()
  }

  async getFileLink (fileId: string) {
    const driveAccount = await this.accountService.getOptimizedAccount()
    const relationFileAccount = await this.fileAccountService.getRelationByFileAndAccountId(fileId, driveAccount.uploaderId)
    const fileToDownload = await this.fileService.getFileByUploaderId(fileId)

    if (relationFileAccount && fileToDownload) {
      driveAccount.downloadsTotal += 1
      driveAccount.downloadsToday += 1
      driveAccount.sizeDownloadTotal += fileToDownload.size
      driveAccount.sizeDownloadsToday += fileToDownload.size
      driveAccount.consecutiveDownloads += 1

      fileToDownload.downloadsToday += 1
      fileToDownload.downloadsTotal += 1

      await this.accountService.updateAccountByDownloader(driveAccount)
      const updatedFile = await this.fileService.updateFileFromDownloader(fileToDownload)
      const filterAccounts = await this.accountService.getAllAccountsExceptOne(driveAccount.uploaderId)

      filterAccounts.forEach((account: AccountEntity) => {
        account.consecutiveDownloads = 0
        this.accountService.updateAccountByDownloader(account)
      })

      return {
        'file name': updatedFile.name,
        'download link': relationFileAccount.downloadLink
      }
    }
    return {
      'file ': 'not found'
    }
  }
}
