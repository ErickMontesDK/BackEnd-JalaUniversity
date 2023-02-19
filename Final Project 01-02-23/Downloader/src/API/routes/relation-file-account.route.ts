import { Router } from 'express'
import FileAccountControllers from '../Controller/file-account-controller'

export const fileAccountRoutes = Router()
const fileAccountControllers = new FileAccountControllers()

fileAccountRoutes.get('/files/:id', async (req, res, next) => {
  fileAccountControllers.getRelationsFromFileId(req, res, next)
})
fileAccountRoutes.get('/accounts/:id', async (req, res, next) => {
  fileAccountControllers.getRelationsFromAccountId(req, res, next)
})
fileAccountRoutes.get('/accounts/:accountId/files/:fileId', async (req, res, next) => {
  fileAccountControllers.getRelationByFileAndAccountId(req, res, next)
})
