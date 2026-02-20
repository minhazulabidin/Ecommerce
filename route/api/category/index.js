const express = require('express');
const { addCategoryController, allCategoryController, updateCategoryController, deleteCategoryController ,getSingleCategoryController} = require('../../../controllers/categoryController');
const upload = require('../../../utilities/upload');
const { isAuthorize } = require('../../../middleware/isAuthorize');
const { isAuthorizeRole } = require('../../../middleware/isAuthorizeRole');
const router = express.Router()

router.post('/add-category', isAuthorize, isAuthorizeRole("admin"), upload.single("image"), addCategoryController)
router.get('/categories', allCategoryController)
router.get('/categories/:slug', getSingleCategoryController)
router.patch('/update-category/:id', upload.single("image"), updateCategoryController)
router.delete('/delete-category/:id', deleteCategoryController)

module.exports = router;