import FileEntity from '../database/entities/file.entity'
import AccountEntity from '../database/entities/account.entity'

export type rabbitAction = 'delete file' | 'update file' | 'upload drive' | 'upload drive' | 'update account' | 'delete account'
export type rabbitDestiny = 'uploader' | 'downloader'
export type messageRabbit = {
  action: rabbitAction,
  body: FileEntity | AccountEntity | string
}
