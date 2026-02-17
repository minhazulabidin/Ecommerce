const express = require('express');
const { addCategoryController, allCategoryController } = require('../../../controllers/categoryController');
const upload = require('../../../utilities/upload');
const router = express.Router()

router.post('/add-category', upload.single("image"), addCategoryController)
router.get('/allCategory', allCategoryController)

module.exports = router;