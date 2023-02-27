import FileEntity, { driveInfo } from '../database/entities/file.entity'
import AccountEntity from '../database/entities/account.entity'

export type rabbitAction = 'delete file' | 'update file' | 'upload drive' | 'upload drive' | 'delete drive' | 'update account' | 'delete account'

export type rabbitDestiny = 'uploader' | 'downloader'

export type messageRabbit = {
  action: rabbitAction,
  body: FileEntity | AccountEntity | string
}

export type influxAccountAction = 'update account' | 'delete account';
export type influxFileAction = 'update file' | 'delete file';

export type AccountValues = {
  email?: string,
  clientid?:string,
  secret?: string,
  token?:string,
}

export interface FileValues {
  name?: string,
  filename?: string,
  status?: string,
  size?: number,
  mimetype?: string,
  driveFile?: driveInfo[]
}
