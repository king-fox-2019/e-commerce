const gcsUpload = require('gcs-upload')
const keyFile = process.env.KEY_FILE
const bucket = process.env.GOOGLE_BUCKET

module.exports = gcsUpload({
    gcsConfig: {
      keyFilename: keyFile,
      bucketName: bucket
    }
})