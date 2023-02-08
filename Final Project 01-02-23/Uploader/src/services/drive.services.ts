const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const CLIENT_ID = '414364546570-37etem9cssl67ieqsjpm887d0tvokcr2.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04lRC4CYqBAVLCgYIARAAGAQSNwF-L9IrUlWVdRktRYZkLP4wnt4BmU0ERqZiWDZVHtoDfrf7WeAwtnJaNXrWnpRTlRpXxzXaLFY'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oauth2Client.setCredentials({ refres_token: REFRESH_TOKEN })

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})
