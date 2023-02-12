import { Router } from 'express'
import AccountControllers from '../Controller/account.controller'

export const accountRoute = Router()
const accountController = new AccountControllers()

accountRoute.post('/', async (req, res) => {
  accountController.createAccount(req, res)
})
accountRoute.get('/:id', async (req, res) => {
  accountController.getAccountById(req, res)
})
accountRoute.put('/:id', async (req, res) => {
  accountController.updateAccountById(req, res)
})
accountRoute.delete('/:id', async (req, res) => {
  accountController.deleteAccountById(req, res)
})
accountRoute.get('/', async (req, res) => {
  accountController.getAllAccounts(req, res)
})
