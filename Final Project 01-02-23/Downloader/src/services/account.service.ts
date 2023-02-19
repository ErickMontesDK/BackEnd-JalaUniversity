import AccountEntity from '../database/entities/account.entity'
import { AccountRepository } from '../database/repository/account.repository'
import FileAccountService from './file-account.service'

export default class AccountService {
  private accountRepository : AccountRepository
  private fileAccountService: FileAccountService

  constructor () {
    this.accountRepository = new AccountRepository()
    this.fileAccountService = new FileAccountService()
  }

  async updateAccountByUploader (messageFile: any) {
    const accountFromDb: AccountEntity | undefined = await this.getAccountByUploaderId(messageFile.id)
    const accounttoUpdate: AccountEntity = accountFromDb || new AccountEntity()

    accounttoUpdate.email = messageFile.email
    accounttoUpdate.uploaderId = accounttoUpdate.uploaderId || messageFile.id.toString()
    accounttoUpdate.downloadsToday = accounttoUpdate.downloadsToday || 0
    accounttoUpdate.downloadsTotal = accounttoUpdate.downloadsTotal || 0
    accounttoUpdate.sizeDownloadTotal = accounttoUpdate.sizeDownloadTotal || 0
    accounttoUpdate.sizeDownloadsToday = accounttoUpdate.sizeDownloadsToday || 0
    accounttoUpdate.consecutiveDownloads = accounttoUpdate.consecutiveDownloads || 0

    return await this.accountRepository.updateAccount(accounttoUpdate)
  }

  async updateAccountByDownloader (messageFile: any) {
    const accountFromDb: AccountEntity | undefined = await this.getAccountById(messageFile.id)
    const accounttoUpdate: AccountEntity = accountFromDb || new AccountEntity()

    accounttoUpdate.email = messageFile.email

    accounttoUpdate.downloadsToday = messageFile.downloadsToday
    accounttoUpdate.downloadsTotal = messageFile.downloadsTotal
    accounttoUpdate.sizeDownloadTotal = messageFile.sizeDownloadTotal
    accounttoUpdate.sizeDownloadsToday = messageFile.sizeDownloadsToday
    accounttoUpdate.consecutiveDownloads = messageFile.consecutiveDownloads

    return await this.accountRepository.updateAccount(accounttoUpdate)
  }

  async getAllAccounts () {
    return await this.accountRepository.readAllAccounts()
  }

  async getAccountById (id:string) {
    return await this.accountRepository.readAccountById(id)
  }

  async getAccountByUploaderId (id:string) {
    return await this.accountRepository.readAccountByUploaderId(id)
  }

  async deleteAccount (id:string) {
    const foundFile = await this.getAccountByUploaderId(id)

    if (foundFile) {
      const deletedFile = await this.accountRepository.deleteAccount(foundFile.id)
      console.log(deletedFile)

      const accountRelationWithFiles = await this.fileAccountService.getRelationstByAccountId(foundFile.uploaderId)

      accountRelationWithFiles.forEach((relation) => {
        this.fileAccountService.deleteFileAccount(relation.id)
      })
    }
  }

  async getOptimizedAccount () {
    return await this.accountRepository.findAccountWithSmallestDownloadToday()
  }

  async getAllAccountsExceptOne (accountId:string) {
    const allAccounts = await this.getAllAccounts()
    const filterAccounts = allAccounts.filter((account:any) => {
      return account.uploaderId !== accountId
    })
    return filterAccounts
  }
}
