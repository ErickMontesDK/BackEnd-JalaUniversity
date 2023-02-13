import { ErrorBuild } from './errorBuild'
import { Request, Response, NextFunction } from 'express'

export default function errorHandler (err:any, req: Request, res: Response, next: NextFunction) {
  console.log(err)

  if (err instanceof ErrorBuild) {
    res.status(err.code).json(err.message)
    return
  }

  res.status(500).json('Something went wrong')
}
