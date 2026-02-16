const express = require('express');
const { addCategoryController } = require('../../../controllers/categoryController');
const router = express.Router()

router.post('/add-category', addCategoryController)

module.exports = router;