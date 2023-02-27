import { ErrorBuild } from '../../utils/errorBuild'
import { AppDataSource } from './../dbsource'
import FileAccountEntity from '../entities/file-account.entity'

export class FileAccountRepository {
  protected repository = AppDataSource.getRepository(FileAccountEntity)

  async createFileAccount (newFileAccount: FileAccountEntity) {
    const response = await this.repository.insert(newFileAccount)
    return response.identifiers[0].id
  }

  async updateFileAccount (updateFileAccount: FileAccountEntity) {
    const response = await this.repository.save(updateFileAccount)
    return response
  }

  async readFileAccountById (id: string) {
    const foundFileAccount = await this.repository.findOneBy({ id })

    if (foundFileAccount) {
      return foundFileAccount
    } else {
      throw ErrorBuild.badRequest('Relation File Account not found in Database')
    }
  }

  async readAllFileAccounts () {
    const allFileAccounts = await this.repository.find()

    if (allFileAccounts) {
      return allFileAccounts
    } else {
      throw ErrorBuild.badRequest('Relation File Account not found in Database')
    }
  }

  async readFileAccountByFileId (id:string) {
    const FileAccountFound = await this.repository.findBy({ fileId: id })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      throw ErrorBuild.badRequest('Relation File Account not found in Database')
    }
  }

  async readFileAccountByAccountId (id:string) {
    const FileAccountFound = await this.repository.findBy({ accountId: id })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      throw ErrorBuild.badRequest('Relation File Account not found in Database')
    }
  }

  async readFileAccountByFileAndAccountId (fileId: string, accountId: string) {
    const FileAccountFound = await this.repository.findOneBy({
      fileId,
      accountId
    })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      return undefined
    }
  }

  async deleteFileAccount (id: string) {
    const deleteFileAccount = await this.repository.delete({ id })

    if (deleteFileAccount) {
      return deleteFileAccount
    } else {
      throw ErrorBuild.badRequest('Relation File Account not found in Database')
    }
  }
}
