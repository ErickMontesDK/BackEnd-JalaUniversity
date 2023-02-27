import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client'
import { FileEntity, AccountEntity } from '../types'
import { hostname } from 'node:os'
import dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({ path: resolve(__dirname, './../../.env') })

const url = process.env.INFLUX_URL as string
const token = process.env.INFLUX_TOKEN as string
const org = process.env.INFLUX_ORG as string
const bucket = process.env.INFLUX_BUCKET as string

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
  }
}
