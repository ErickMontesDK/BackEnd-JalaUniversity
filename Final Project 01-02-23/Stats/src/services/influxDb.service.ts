import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client'
import { FileEntity, AccountEntity } from '../types'
import { hostname } from 'node:os'

const url = 'http://localhost:8086'
const token = 'On0ix5jcG2uAIfTyH_2RYEqxv0ZZgfwinaggu0bD8MhmmVEuqihYbA9CLfAjgSBc3GldbhZc2O4_UA6FqtLhJA=='
const org = 'jala-backend'
const bucket = 'microservices'

export default class InfluxDBClient {
  private writeApi!: WriteApi

  constructor () {
    this.writeApi = new InfluxDB({ url, token })
      .getWriteApi(org, bucket, 'ns')
      .useDefaultTags({ location: hostname() })
  }

  public async writePoint (file: FileEntity, account: AccountEntity) {
    const date = new Date()

    const pointFile = new Point('Downloads-File')
      .tag('file', file.name)
      .intField('downloads_total', file.downloadsTotal)
      .intField('downloads_today', file.downloadsToday)
      .timestamp(date)

    const pointAccount = new Point('Downloads-Account')
      .tag('account', account.uploaderId)
      .intField('downloads_total', account.downloadsTotal)
      .intField('downloads_today', account.downloadsToday)
      .intField('sizeDownloadTotal', account.sizeDownloadTotal)
      .intField('sizeDownloadsToday', account.sizeDownloadsToday)
      .timestamp(date)

    this.writeApi.writePoint(pointFile)
    this.writeApi.writePoint(pointAccount)
    await this.writeApi.flush()
    console.log(pointFile, pointAccount)
  }
}
