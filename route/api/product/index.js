const express = require('express');
const { addProductController } = require('../../../controllers/productController');
const upload = require('../../../utilities/upload');
const router = express.Router()

router.post('/addProduct', upload.array("image", 5), addProductController)

module.exports = router;