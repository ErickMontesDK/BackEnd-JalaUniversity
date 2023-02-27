import AccountEntity from '../database/entities/account.entity'
import { AccountRepository } from '../database/repository/account.repository'
import FileAccountService from './file-account.service'
import InfluxDBClient from './influxDb.service'

export default class AccountService {
  private accountRepository : AccountRepository
  private fileAccountService: FileAccountService
  private InfluxDBservice: InfluxDBClient

  constructor () {
    this.accountRepository = new AccountRepository()
    this.fileAccountService = new FileAccountService()
    this.InfluxDBservice = new InfluxDBClient()
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

    const updatedAccount = await this.accountRepository.updateAccount(accounttoUpdate)
    this.InfluxDBservice.writePointAccount(updatedAccount, 'update account')
    return updatedAccount
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

    const updatedAccount = await this.accountRepository.updateAccount(accounttoUpdate)
    this.InfluxDBservice.writePointAccount(updatedAccount, 'update account')
    return updatedAccount
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
      this.InfluxDBservice.writePointAccount(foundFile, 'delete account')
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

  async dailyUpdateDownloads () {
    this.accountRepository.dailyUpdate()
    console.log('actualizando accounts')
  }
}
