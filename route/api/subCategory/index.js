const express = require("express")
const { subCategoryController } = require("../../../controllers/subCategoryController")
const router = express.Router()

router.post("/add-subcategory", subCategoryController)

module.exports = router