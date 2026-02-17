const express = require('express');
const router = express.Router()

router.use('/auth', require('./auth'));
router.use('/category', require('./category'));
router.use('/sub-category', require('./subCategory'));

module.exports = router;