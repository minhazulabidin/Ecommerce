const express = require('express');
const { addProductController } = require('../../../controllers/productController');
const router = express.Router()

router.post('/addProduct', addProductController)

module.exports = router;