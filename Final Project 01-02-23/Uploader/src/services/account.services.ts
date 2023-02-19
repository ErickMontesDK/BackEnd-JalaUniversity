import AccountEntity from '../database/entities/account.entity'

import { AccountRepository } from '../database/repository/account.repository'
import RabbitMqService from './rabbitmq_service'

type AccountValues = {
  email?: string,
  clientid?:string,
  secret?: string,
  token?:string,
}

export default class AccountService {
  protected accountRepository: AccountRepository
  protected rabbitService: RabbitMqService

  constructor () {
    this.accountRepository = new AccountRepository()
    this.rabbitService = new RabbitMqService()
  }

  async getAllAccounts () {
    return await this.accountRepository.readAll()
  }

  async createAccount (accountValues: AccountValues) {
    const newAccount = new AccountEntity()
    newAccount.email = accountValues.email!
    newAccount.client_id = accountValues.clientid!
    newAccount.client_secret = accountValues.secret!
    newAccount.refresh_token = accountValues.token!

    const account = await this.accountRepository.createAccount(newAccount)
    this.rabbitService.sendMessage(account, 'update account', 'downloader')
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

  async deleteAccountById (id: string) {
    const deletedAccount = await this.accountRepository.deleteAccount(id)
    this.rabbitService.sendMessage(id, 'delete account', 'downloader')
    return deletedAccount
  }
}
