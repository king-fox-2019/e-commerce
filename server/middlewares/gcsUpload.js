const gcsUpload = require("gcs-upload");

const upload = gcsUpload({
  limits: {
    fileSize: 1e6
  },
  gcsConfig: {
    keyFilename: "/Users/me/google-credential-keyfile.json",
    bucketName: "my-bucket"
  }
});

module.exports = {upload}