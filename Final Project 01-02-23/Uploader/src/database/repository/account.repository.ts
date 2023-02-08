import AccountEntity from '../entities/account.entity'
import { AppDataSource } from './../dbsource'
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

export class AccountRepository {
  protected repository = AppDataSource.getMongoRepository(AccountEntity)

  async createAccount (newAccount: AccountEntity) {
    return await this.repository.save(newAccount)
  }

  async readAccount (id: string): Promise<AccountEntity> {
    const objectId = new ObjectId(id)
    const foundAccount = await this.repository.findOneBy({ _id: objectId })

    if (foundAccount) {
      return foundAccount
    } else {
      throw new Error(`Account with id:${id} not found`)
    }
  }

  async updateAccount (account: AccountEntity) {
    return await this.repository.save(account)
  }

  async deleteAccount (id: string) {
    const objectId = new ObjectId(id)
    const deletedAccount = await this.repository.findOneAndDelete({ _id: objectId })

    if (deletedAccount) {
      return deletedAccount.value._id
    } else {
      throw new Error(`Account with id:${id} not found`)
    }
  }
}
