import { ErrorBuild } from '../utils/errorBuild'
import AccountService from './account.services'
import FileService from './file.services'

export default class UploadHandlerService {
  private fileService: FileService
  private accountService: AccountService

  constructor () {
    this.fileService = new FileService()
    this.accountService = new AccountService()
  }

  rabbitMqReceiveMessage (newMessage: any) {
    const { action, body } = newMessage

    switch (action) {
      case 'upload drive':
        this.fileService.uploadToDriveAccounts(body)
        break
      case 'delete drive':
        this.fileService.deleteFileById(body.id)
        break
      case 'delete account':
        console.log('uploader')
        this.accountService.deleteAccountById(body)
        break
      default:
        throw ErrorBuild.internalServerError('Action not received')
    }
  }
}
