import { ErrorBuild } from '../../utils/errorBuild'
import { AppDataSource } from './../dbsource'
import AccountEntity from '../entities/account.entity'

export class AccountRepository {
  protected repository = AppDataSource.getRepository(AccountEntity)

  async createAccount (newAccount: AccountEntity) {
    const response = await this.repository.insert(newAccount)
    return response.identifiers[0].id
  }

  async updateAccount (updateAccount: AccountEntity) {
    const response = await this.repository.save(updateAccount)
    return response
  }

  async countAccounts (): Promise<number> {
    return await this.repository.count()
  }

  async readAccountById (id: string) {
    const foundAccount = await this.repository.findOneBy({ id })

    if (foundAccount) {
      return foundAccount
    } else {
      throw ErrorBuild.badRequest('Account not found in Database')
    }
  }

  async readAllAccounts () {
    const allAccounts = await this.repository.find()

    if (allAccounts) {
      return allAccounts
    } else {
      throw ErrorBuild.badRequest('Accounts not found in Database')
    }
  }

  async readAccountByUploaderId (id:string) {
    const AccountFound = await this.repository.findOneBy({ uploaderId: id })

    if (AccountFound) {
      return AccountFound
    } else {
      return undefined
    }
  }

  async deleteAccount (id: string) {
    const deleteAccount = await this.repository.delete({ id })

    if (deleteAccount) {
      return deleteAccount
    } else {
      throw ErrorBuild.badRequest('Account not found in Database')
    }
  }

  async findAccountWithSmallestDownloadToday () {
    const response = await this.repository.createQueryBuilder('account')
      .where('account.consecutiveDownloads <= :consecutiveDownloads', { consecutiveDownloads: 5 })
      .orderBy('account.sizeDownloadsToday', 'ASC')
      .getOne()

    if (response) {
      return response
    } else {
      throw ErrorBuild.badRequest('Account not found in Database')
    }
  }

  async dailyUpdate () {
    await this.repository.update({}, { downloadsToday: 0, sizeDownloadsToday: 0 })
  }
}
