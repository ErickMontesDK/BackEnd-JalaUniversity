import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client'
import { hostname } from 'node:os'
import dotenv from 'dotenv'
import { resolve } from 'path'
import FileEntity from '../database/entities/file.entity'
import AccountEntity from '../database/entities/account.entity'
import { influxAccountAction, influxFileAction } from '../utils/types'
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

  public async writePointFile (file: FileEntity, action:influxFileAction) {
    const date = new Date()

    const pointFile = new Point('Downloader-File')
      .tag(action, file.uploaderId)
      .stringField('file', file.name)
      .timestamp(date)

    this.writeApi.writePoint(pointFile)
    await this.writeApi.flush()
    console.log(pointFile)
  }

  public async writePointAccount (account: AccountEntity, action:influxAccountAction) {
    const date = new Date()

    const pointFile = new Point('Downloader-Accounts')
      .tag(action, account.uploaderId)
      .stringField('account', account.email)
      .timestamp(date)

    this.writeApi.writePoint(pointFile)
    await this.writeApi.flush()
    console.log(pointFile)
  }
}
