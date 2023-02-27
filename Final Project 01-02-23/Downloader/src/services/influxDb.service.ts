import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client'
import { hostname } from 'node:os'
import dotenv from 'dotenv'
import { resolve } from 'path'
import FileService from './file.services'
import AccountService from './account.service'
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

  public async writePointQuantityFiles () {
    try {
      const quantity = await FileService.getNumberOfFiles()
      const date = new Date()

      const pointFile = new Point('Files_Downloader')
        .tag('files', 'Files_Downloader')
        .intField('quantity_Files', quantity)
        .timestamp(date)

      this.writeApi.writePoint(pointFile)
      await this.writeApi.flush()
    } catch (error) {
      console.error(error)
    }
  }

  public async writePointQuantityAccount () {
    try {
      const quantity = await AccountService.getNumberOfAccounts()
      const date = new Date()

      const pointFile = new Point('Accounts_Downloader')
        .tag('accounts', 'Accounts_Downloader')
        .intField('quantity_Accounts', quantity)
        .timestamp(date)

      this.writeApi.writePoint(pointFile)
      await this.writeApi.flush()
    } catch (error) {
      console.error(error)
    }
  }
}
