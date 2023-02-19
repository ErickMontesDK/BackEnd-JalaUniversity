import { Request, Response, NextFunction } from 'express'
import { ErrorBuild } from '../../utils/errorBuild'
import DownloaderService from '../../services/downloader.service'

export default class DownloadController {
  protected downloaderService: DownloaderService

  constructor () {
    this.downloaderService = new DownloaderService()
  }

  async getFileLink (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!id) {
      next(ErrorBuild.badRequest('Not File id received, please send a valid id and try again'))
      return
    }

    try {
      const linkData = await this.downloaderService.getFileLink(id)
      res.status(200).json({ message: 'Files found', data: linkData })
    } catch (error) {
      next(error)
    }
  }
}
