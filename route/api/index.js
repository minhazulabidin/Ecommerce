const express = require('express');
const router = express.Router()

router.use('/auth', require('./auth'));
router.use('/category', require('./category'));
router.use('/subCategory', require('./subCategory'));
router.use('/banner', require('./banner'));
router.use('/merchant', require('./merchant'));
router.use('/products', require('./product'))

module.exports = router;