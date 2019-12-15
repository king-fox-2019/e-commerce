var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   region: process.env.AWS_REGION
})

var s3 = new aws.S3({ /* ... */ })

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'zoezachary',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

const singleUpload = upload.single('image')
 
// app.post('/upload', upload.array('photos', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

module.exports = {
  upload,
  singleUpload
}