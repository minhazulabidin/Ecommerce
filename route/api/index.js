const express = require('express');
const router = express.Router()

router.use('/auth', require('./auth'));
router.use('/category', require('./category'));
router.use('/subCategory', require('./subCategory'));
router.use('/banner', require('./banner'));
router.use('/merchant', require('./merchant'));
router.use('/products', require('./product'))
router.use('/variant', require('./variant'))
router.use('/review', require('./review'))
router.use('/cart', require('./cart'))
router.use('/order',require('./order'))

module.exports = router;