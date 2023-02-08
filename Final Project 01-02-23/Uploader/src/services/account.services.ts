import AccountEntity from '../database/entities/account.entity'

import { AccountRepository } from '../database/repository/account.repository'

type AccountValues = {
  email: string,
  driveKey:string,
}

export default class AccountService {
  protected accountRepository: AccountRepository

  constructor () {
    this.accountRepository = new AccountRepository()
  }

  async createAccount (accountValues: AccountValues) {
    const newAccount = new AccountEntity()
    newAccount.email = accountValues.email
    newAccount.driveKey = accountValues.driveKey

    return await this.accountRepository.createAccount(newAccount)
  }

  async getAccountById (id: string) {
    return await this.accountRepository.readAccount(id)
  }

  async updateAccountById (id: string, accountValues: AccountValues) {
    const updateAccount = await this.getAccountById(id)

    updateAccount.email = accountValues.email === '' ? updateAccount.email : accountValues.email
    updateAccount.driveKey = accountValues.driveKey === '' ? updateAccount.driveKey : accountValues.driveKey

    return await this.accountRepository.updateAccount(updateAccount)
  }

  async deleteAccountById (id: string) {
    return await this.accountRepository.deleteAccount(id)
  }
}
