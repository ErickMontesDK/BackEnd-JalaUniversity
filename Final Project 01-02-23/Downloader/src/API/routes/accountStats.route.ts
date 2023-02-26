import { Router } from 'express'
import AccountStatsController from '../Controller/accountStats-controller'

export const accountStatsRoute = Router()
const accountController = new AccountStatsController()

accountStatsRoute.get('/', async (req, res, next) => {
  accountController.getAllAccountsStats(req, res, next)
})
accountStatsRoute.get('/:id', async (req, res, next) => {
  accountController.getAccountByDownloaderId(req, res, next)
})
accountStatsRoute.get('/uploader/:id', async (req, res, next) => {
  accountController.getAccountByUploaderId(req, res, next)
})
