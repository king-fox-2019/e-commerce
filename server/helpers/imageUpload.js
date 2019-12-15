const gcsUpload = require('gcs-upload')

const imageUpload = gcsUpload({
  limits: {
      fileSize: 1e6 // in bytes
  },
  gcsConfig: {
      keyFilename: "../Hacktiv8-KingFox-37-0b900e4f3e70.json",
      bucketName: "ecommerce-kingfox-37"
  }
})

module.exports = imageUpload