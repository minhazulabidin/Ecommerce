const multer = require('multer')
const path = require('path');
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
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter:
        function (req, file, cb) {
            checkFileType(file, cb)
        }

})

module.exports = upload;