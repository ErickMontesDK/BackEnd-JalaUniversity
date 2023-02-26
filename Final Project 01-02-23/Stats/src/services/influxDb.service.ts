import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client'
import { FileEntity } from '../types'
import { hostname } from 'node:os'

const url = 'http://localhost:8086'
const token = 'On0ix5jcG2uAIfTyH_2RYEqxv0ZZgfwinaggu0bD8MhmmVEuqihYbA9CLfAjgSBc3GldbhZc2O4_UA6FqtLhJA=='
const org = 'jala-backend'
const bucket = 'microservices'

export default class InfluxDBClient {
  private influxDB!: InfluxDB
  private writeApi!: WriteApi

  private url: string
  private token: string
  private org: string
  private bucket: string

  constructor () {
    this.url = 'http://localhost:8086'
    this.token = 'On0ix5jcG2uAIfTyH_2RYEqxv0ZZgfwinaggu0bD8MhmmVEuqihYbA9CLfAjgSBc3GldbhZc2O4_UA6FqtLhJA=='
    this.org = 'jala-backend'
    this.bucket = 'microservices'
    this.writeApi = new InfluxDB({ url, token })
      .getWriteApi(org, bucket, 'ns')
      .useDefaultTags({ location: hostname() })
  }

  public async writePoint (file: FileEntity) {
    const point = new Point('Downloads')
      .tag('file', file.name)
      .floatField('downloads_total', file.downloadsTotal)
      .intField('downloads_today', file.downloadsToday)
      .timestamp(new Date())

    this.writeApi.writePoint(point)
    await this.writeApi.flush()
    console.log(point)
  }
}
