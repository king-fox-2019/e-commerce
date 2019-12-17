const { Storage } = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE
})



const bucket = storage.bucket(CLOUD_BUCKET)
const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}
module.exports = (req, res, next) => {
    if (!req.file) {
        // return next({
        //     status: 400,
        //     message: `Please upload new image`
        // })
        next()
    } else {
        const gcsname = Date.now() + req.file.originalname.split(' ').join('');
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            },
            resumable: false
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });
        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            file.makePublic().then(() => {
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
                next();
            });
        });
        stream.end(req.file.buffer);
    }

    // else if (!req.file.mimetype.includes('image/jpeg' || 'image/png')) {
    //     return next({
    //         status: 400,
    //         message: `file not supported`
    //     })
    // }

}