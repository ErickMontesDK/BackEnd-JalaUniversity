import { ErrorBuild } from '../utils/errorBuild'
import AccountService from './account.service'
import FileService from './file.services'
import FileAccountService from './file-account.service'

export default class UploadHandlerService {
  private fileService: FileService
  private accountService: AccountService
  private relationalService: FileAccountService

  constructor () {
    this.fileService = new FileService()
    this.accountService = new AccountService()
    this.relationalService = new FileAccountService()
  }

  rabbitMqReceiveMessage (newMessage: any) {
    const { action, body } = newMessage

    switch (action) {
      case 'update file':
        this.fileService.updateFileFromUploader(body)
        this.relationalService.handlerFileAccounts(body)
        break
      case 'delete file':
        this.fileService.deleteFile(body)
        break
      case 'update account':
        this.accountService.updateAccountByUploader(body)
        break
      case 'delete account':
        this.accountService.deleteAccount(body)
        break
      default:
        throw ErrorBuild.internalServerError('Action not received')
    }
  }
}
