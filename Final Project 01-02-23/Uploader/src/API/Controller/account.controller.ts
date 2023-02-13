import { NextFunction, Request, Response } from 'express'
import 'reflect-metadata'
import AccountService from '../../services/account.services'
import { ErrorBuild } from '../../utils/errorBuild'

export default class AccountControllers {
  protected accountService: AccountService

  constructor () {
    this.accountService = new AccountService()
  }

  async getAllAccounts (req: Request, res: Response, next:NextFunction) {
    try {
      const dataAccounts = await this.accountService.getAllAccounts()
      return res.status(200).json({ message: 'Accounts found.', data: dataAccounts })
    } catch (error) {
      next(error)
    }
  }

  async createAccount (req: Request, res: Response, next:NextFunction) {
    const { email, clientid, secret, token } = req.body

    if (!email || !clientid || !secret || !token) {
      next(ErrorBuild.badRequest('One or more parameters were not send. (email, clientid, secret or token)'))
      return
    }

    try {
      const AccountValues = {
        email,
        clientid,
        secret,
        token
      }

      const newAccount = await this.accountService.createAccount(AccountValues)

      return res.status(201).json({ account: newAccount, message: 'Account created successfully.' })
    } catch (error) {
      next(error)
    }
  }

  async getAccountById (req: Request, res: Response, next:NextFunction) {
    const { id } = req.params

    if (!id) {
      next(ErrorBuild.badRequest('Not Account id received, please send a valid id and try again'))
      return
    }

    try {
      const foundAccount = await this.accountService.getAccountById(id)

      return res.status(200).json({ file: foundAccount, message: 'Account found successfully.' })
    } catch (error) {
      next(error)
    }
  }

  async updateAccountById (req: Request, res: Response, next:NextFunction) {
    const { id } = req.params

    if (!id) {
      next(ErrorBuild.badRequest('Not Account id received, please send a valid id and try again'))
      return
    }

    try {
      const accountValues = {
        email: req.body.email || undefined,
        clientid: req.body.drivekey || undefined,
        secret: req.body.secret || undefined,
        token: req.body.token || undefined
      }

      const updatedAccount = await this.accountService.updateAccountById(id, accountValues)

      return res.status(200).json({ data: updatedAccount, message: 'Account updated successfully.' })
    } catch (error) {
      next(error)
    }
  }

  async deleteAccountById (req: Request, res: Response, next:NextFunction) {
    const { id } = req.params

    if (!id) {
      next(ErrorBuild.badRequest('Not Account id received, please send a valid id and try again'))
      return
    }

    try {
      await this.accountService.deleteAccountById(id)

      return res.status(204).json({ message: 'Account deleted successfully.' })
    } catch (error) {
      next(error)
    }
  }
}
