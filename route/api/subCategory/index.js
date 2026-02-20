const express = require("express")
const { subCategoryController, updateSubCategoriyController } = require("../../../controllers/subCategoryController")
const router = express.Router()

router.post("/addSubcategory", subCategoryController)
router.patch("/updateSubcategory/:id", updateSubCategoriyController)

module.exports = router