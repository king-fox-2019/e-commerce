const router = require('express').Router()
const upload = require('../middlewares/gcsUpload')

router.post('/upload-single', upload.single('image'), (req,res)=>{
    let img = req.body
    res.json({ img })
})

module.exports = router