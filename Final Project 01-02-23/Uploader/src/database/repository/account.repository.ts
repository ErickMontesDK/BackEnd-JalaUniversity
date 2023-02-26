import AccountEntity from '../entities/account.entity'
import { AppDataSource } from './../dbsource'
import { ErrorBuild } from '../../utils/errorBuild'
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

export class AccountRepository {
  protected repository = AppDataSource.getMongoRepository(AccountEntity)

  async createAccount (newAccount: AccountEntity) {
    return await this.repository.save(newAccount)
  }

  async readAll () {
    const driveAccounts = await this.repository.find()
    if (driveAccounts) {
      return driveAccounts
    } else {
      throw ErrorBuild.badRequest('Accounts Information was not found in Database')
    }
  }

  async readAccount (id: string): Promise<AccountEntity> {
    const objectId = new ObjectId(id)
    const foundAccount = await this.repository.findOneBy({ _id: objectId })

    if (foundAccount) {
      return foundAccount
    } else {
      throw ErrorBuild.badRequest('Account not found in Database')
    }
  }

  async updateAccount (account: AccountEntity) {
    const updateAccount = await this.repository.save(account)

    if (updateAccount) {
      return updateAccount
    } else {
      throw ErrorBuild.internalServerError('File was not updated')
    }
  }

  async deleteAccount (id: string) {
    const objectId = new ObjectId(id)
    const deletedAccount = await this.repository.findOneAndDelete({ _id: objectId })

    if (deletedAccount) {
      return id
    } else {
      throw ErrorBuild.badRequest('File not found in Database')
    }
  }
}
