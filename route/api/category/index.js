const express = require('express');
const { addCategoryController } = require('../../../controllers/categoryController');
const upload = require('../../../utilities/upload');
const router = express.Router()

router.post('/add-category', upload.single("image"), addCategoryController)

module.exports = router;