import FileService from './file.services'
import AccountService from './account.service'
const cron = require('node-cron')

export default class StartDailyUpdateTask {
  private fileService: FileService
  private accountService: AccountService

  constructor () {
    this.fileService = new FileService()
    this.accountService = new AccountService()
  }

  setScheduleUpdate () {
    cron.schedule('0 0 * * *', () => {
      this.fileService.dailyUpdateDownloads()
      this.accountService.dailyUpdateDownloads()
    }, {
      scheduled: true,
      timezone: 'America/Mexico_City'
    })
  }
}
