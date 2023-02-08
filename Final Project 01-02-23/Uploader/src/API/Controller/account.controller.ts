import { Request, Response } from 'express'
import 'reflect-metadata'
import AccountService from '../../services/account.services'

export default class AccountControllers {
  protected accountService: AccountService

  constructor () {
    this.accountService = new AccountService()
  }

  async createAccount (req: Request, res: Response) {
    const { email, drivekey } = req.body

    if (!email || !drivekey) {
      return res.status(400).json({ error: 'Email and driveKey are required.' })
    }

    try {
      const AccountValues = {
        email,
        driveKey: drivekey
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

    const accountValues = {
      email: req.body.email || '',
      driveKey: req.body.drivekey || ''
    }

    try {
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
