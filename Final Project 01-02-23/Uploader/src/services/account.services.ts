import AccountEntity from '../database/entities/account.entity'
import { AccountRepository } from '../database/repository/account.repository'
import RabbitMqService from './rabbitmq_service'
import FileService from './file.services'
import FileEntity from '../database/entities/file.entity'
import InfluxDBClient from './influxDb.service'

type AccountValues = {
  email?: string,
  clientid?:string,
  secret?: string,
  token?:string,
}

export default class AccountService {
  protected accountRepository: AccountRepository
  protected rabbitService: RabbitMqService
  protected influxDbService: InfluxDBClient
  static accountRepository: AccountRepository = new AccountRepository()

  constructor () {
    this.accountRepository = new AccountRepository()
    this.rabbitService = new RabbitMqService()
    this.influxDbService = new InfluxDBClient()
  }

  async getAllAccounts () {
    return await this.accountRepository.readAll()
  }

  static async getNumberOfAccounts () {
    return await this.accountRepository.countAccounts()
  }

  async createAccount (accountValues: AccountValues) {
    const newAccount = new AccountEntity()
    newAccount.email = accountValues.email!
    newAccount.client_id = accountValues.clientid!
    newAccount.client_secret = accountValues.secret!
    newAccount.refresh_token = accountValues.token!

    const account = await this.accountRepository.createAccount(newAccount)
    this.rabbitService.sendMessage(account, 'update account', 'downloader')

    const fileService: FileService = new FileService()
    const allFiles = await fileService.getAllFiles()

    allFiles.forEach((file:FileEntity) => {
      this.rabbitService.sendMessage(file, 'upload drive', 'uploader')
      console.log('asi se esta enviando el archivo a rabbit', file)
    })
    this.influxDbService.writePointQuantityAccount()
    return account
  }

  async getAccountById (id: string) {
    return await this.accountRepository.readAccount(id)
  }

  async updateAccountById (id: string, accountValues: AccountValues) {
    const updateAccount = await this.getAccountById(id)

    updateAccount.email = accountValues.email ? accountValues.email : updateAccount.email
    updateAccount.client_id = accountValues.clientid ? accountValues.clientid : updateAccount.client_id
    updateAccount.client_secret = accountValues.secret ? accountValues.secret : updateAccount.client_secret
    updateAccount.refresh_token = accountValues.token ? accountValues.token : updateAccount.refresh_token

    const updatedAccount = await this.accountRepository.updateAccount(updateAccount)
    this.rabbitService.sendMessage(updatedAccount, 'update account', 'downloader')
    return updatedAccount
  }

  async deleteAccountProcess (id: string) {
    const account = await this.getAccountById(id)

    const fileService = new FileService()
    const allFiles = await fileService.getAllFiles()

    allFiles.forEach(async (file:FileEntity) => {
      fileService.deleteAccountFromFile(file, account.id)
    })
    this.rabbitService.sendMessage(id, 'delete account', 'uploader')
    return 'The account with each file inside are being deleted'
  }

  async deleteAccountById (id: string) {
    console.log('paso final', id)
    const deletedAccount = await this.accountRepository.deleteAccount(id)
    this.rabbitService.sendMessage(id, 'delete account', 'downloader')
    this.influxDbService.writePointQuantityAccount()
    console.log(deletedAccount)
  }
}
