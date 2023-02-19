import { ErrorBuild } from '../utils/errorBuild'
import FileService from './file.services'

export default class UploadHandlerService {
  private fileService: FileService

  constructor () {
    this.fileService = new FileService()
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
      default:
        throw ErrorBuild.internalServerError('Action not received')
    }
  }
}
