const express = require('express');
const { addCategoryController, allCategoryController } = require('../../../controllers/categoryController');
const upload = require('../../../utilities/upload');
const { isAuthorize } = require('../../../middleware/isAuthorize');
const { isAuthorizeRole } = require('../../../middleware/isAuthorizeRole');
const router = express.Router()

router.post('/add-category', isAuthorize, isAuthorizeRole("admin"), upload.single("image"), addCategoryController)
router.get('/allCategory', allCategoryController)

module.exports = router;