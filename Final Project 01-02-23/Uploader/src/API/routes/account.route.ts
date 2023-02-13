import { Router } from 'express'
import AccountControllers from '../Controller/account.controller'

export const accountRoute = Router()
const accountController = new AccountControllers()

accountRoute.post('/', async (req, res, next) => {
  accountController.createAccount(req, res, next)
})
accountRoute.get('/:id', async (req, res, next) => {
  accountController.getAccountById(req, res, next)
})
accountRoute.put('/:id', async (req, res, next) => {
  accountController.updateAccountById(req, res, next)
})
accountRoute.delete('/:id', async (req, res, next) => {
  accountController.deleteAccountById(req, res, next)
})
accountRoute.get('/', async (req, res, next) => {
  accountController.getAllAccounts(req, res, next)
})
