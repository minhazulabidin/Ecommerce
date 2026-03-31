const express = require('express')
const { addToCartController, singleProductCartController } = require('../../../controllers/cartController')
const { isAuthorize } = require('../../../middleware/isAuthorize')
const router = express.Router()

router.post('/addCart', isAuthorize, addToCartController)
router.get('/single-cart/:user', isAuthorize, singleProductCartController)

module.exports = router