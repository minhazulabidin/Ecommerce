const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split(".")
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext[ext.length - 1])
    }
})

const upload = multer({
    storage: storage, limits: {
        fileSize: 2 * 1024 * 1024
    }
})

module.exports = upload;