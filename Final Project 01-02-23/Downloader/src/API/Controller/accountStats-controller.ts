import { Request, Response, NextFunction } from 'express'
import { ErrorBuild } from '../../utils/errorBuild'
import AccountService from '../../services/account.service'

export default class AccountStatsController {
  protected accountService: AccountService

  constructor () {
    this.accountService = new AccountService()
  }

  async getAllAccountsStats (req: Request, res: Response, next: NextFunction) {
    const accounts = await this.accountService.getAllAccounts()

    res.status(200).json({ message: 'Accounts found', data: accounts })
  }

  async getAccountByDownloaderId (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }
    try {
      const accountStats = await this.accountService.getAccountById(id)
      res.status(200).json({ message: 'Account found', data: accountStats })
    } catch (error) {
      next(error)
    }
  }

  async getAccountByUploaderId (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }
    try {
      const accountStats = await this.accountService.getAccountByUploaderId(id)
      res.status(200).json({ message: 'Account found', data: accountStats })
    } catch (error) {
      next(error)
    }
  }
}
