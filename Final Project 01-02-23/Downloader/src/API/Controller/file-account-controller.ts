import { Request, Response, NextFunction } from 'express'
import { ErrorBuild } from '../../utils/errorBuild'
import FileAccountService from '../../services/file-account.service'

export default class FileAccountControllers {
  protected fileAccountService: FileAccountService

  constructor () {
    this.fileAccountService = new FileAccountService()
  }

  async getRelationsFromFileId (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }

    try {
      const files = await this.fileAccountService.getRelationstByFileId(id)
      res.status(200).json({ message: 'Files found', data: files })
    } catch (error) {
      next(error)
    }
  }

  async getRelationsFromAccountId (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }

    try {
      const files = await this.fileAccountService.getRelationstByAccountId(id)
      res.status(200).json({ message: 'Files found', data: files })
    } catch (error) {
      next(error)
    }
  }

  async getRelationByFileAndAccountId (req: Request, res: Response, next: NextFunction) {
    const { accountId, fileId } = req.params
    console.log(accountId, fileId)

    if (!accountId || !fileId) {
      next(ErrorBuild.badRequest('One or more parameters were not send. (accountId or fileId)'))
      return
    }

    try {
      const files = await this.fileAccountService.getRelationByFileAndAccountId(fileId, accountId)
      res.status(200).json({ message: 'Files found', data: files })
    } catch (error) {
      next(error)
    }
  }
}
