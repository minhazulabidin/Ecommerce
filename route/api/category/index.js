const express = require('express');
const { addCategoryController, allCategoryController, updateCategoryController } = require('../../../controllers/categoryController');
const upload = require('../../../utilities/upload');
const { isAuthorize } = require('../../../middleware/isAuthorize');
const { isAuthorizeRole } = require('../../../middleware/isAuthorizeRole');
const router = express.Router()

router.post('/add-category', isAuthorize, isAuthorizeRole("admin"), upload.single("image"), addCategoryController)
router.get('/allCategory', allCategoryController)
router.patch('/update-category/:id', upload.single("image"), updateCategoryController)

module.exports = router;