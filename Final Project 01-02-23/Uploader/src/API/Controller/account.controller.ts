import { Request, Response } from 'express'
import 'reflect-metadata'
import AccountService from '../../services/account.services'

export default class AccountControllers {
  protected accountService: AccountService

  constructor () {
    this.accountService = new AccountService()
  }

  async getAllAccounts (req: Request, res: Response) {
    const meh = await this.accountService.getAllAccounts()
    console.log(meh)
  }

  async createAccount (req: Request, res: Response) {
    const { email, clientid, secret, token } = req.body

    if (!email || !clientid || !secret || !token) {
      return res.status(400).json({ error: 'Email and driveKey are required.' })
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
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message })
    }
  }

  async getAccountById (req: Request, res: Response) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'The Account id is required.' })

    try {
      const foundAccount = await this.accountService.getAccountById(id)

      return res.status(200).json({ file: foundAccount, message: 'Account found successfully.' })
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(404).json({ message: error.message })
    }
  }

  async updateAccountById (req: Request, res: Response) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'The Account id is required.' })

    try {
      const accountValues = {
        email: req.body.email || undefined,
        clientid: req.body.drivekey || undefined,
        secret: req.body.secret || undefined,
        token: req.body.token || undefined
      }

      const updatedAccount = await this.accountService.updateAccountById(id, accountValues)

      return res.status(200).json({ data: updatedAccount, message: 'Account updated successfully.' })
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message })
    }
  }

  async deleteAccountById (req: Request, res: Response) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'The Account id is required.' })

    try {
      const deletedAccount = await this.accountService.deleteAccountById(id)

      return res.status(200).json({ id: deletedAccount, message: 'Account deleted successfully.' })
    } catch (error:unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message })
    }
  }
}
