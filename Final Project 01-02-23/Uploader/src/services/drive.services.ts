import AccountEntity from '../database/entities/account.entity'
import FileEntity from '../database/entities/file.entity'
const stream = require('stream')
const { google } = require('googleapis')
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

export default class DriveServices {
  private oauth2Client:any
  private drive:any
  private refresh_token:any

  constructor (account: AccountEntity) {
    this.oauth2Client = new google.auth.OAuth2(
      account.client_id,
      account.client_secret,
      REDIRECT_URI
    )

    this.refresh_token = account.refresh_token

    this.oauth2Client.setCredentials({ refresh_token: this.refresh_token })

    this.drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client
    })
  }

  async uploadFile (fileBuffer:Buffer, file:FileEntity) {
    try {
      const bufferStream = new stream.PassThrough()
      bufferStream.end(fileBuffer)

      const response = await this.drive.files.create({
        requestBody: {
          name: file.filename,
          mimeType: file.mimetype
        },
        media: {
          mimeType: file.mimetype,
          body: bufferStream
        }
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  async deleteFile (fileId: string) {
    try {
      const response = await this.drive.files.delete({
        fileId
      })
      return response.status
    } catch (error) {
      return error
    }
  }

  async generatePublicUrl (fileId: string) {
    try {
      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })

      const result = await this.drive.files.get({
        fileId,
        fields: 'webContentLink'
      })
      return result
    } catch (error) {
      return error
    }
  }
}
