import AccountEntity from '../database/entities/account.entity'

import { AccountRepository } from '../database/repository/account.repository'

type AccountValues = {
  email?: string,
  clientid?:string,
  secret?: string,
  token?:string,
}

export default class AccountService {
  protected accountRepository: AccountRepository

  constructor () {
    this.accountRepository = new AccountRepository()
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

    return await this.accountRepository.createAccount(newAccount)
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

    return await this.accountRepository.updateAccount(updateAccount)
  }

  async deleteAccountById (id: string) {
    return await this.accountRepository.deleteAccount(id)
  }
}
