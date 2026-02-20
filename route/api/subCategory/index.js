const express = require("express")
const { subCategoryController, updateSubCategoriyController, deleteSubCategoriyController } = require("../../../controllers/subCategoryController")
const router = express.Router()

router.post("/addSubcategory", subCategoryController)
router.patch("/updateSubcategory/:id", updateSubCategoriyController)
router.delete("/deleteSubcategory/:id", deleteSubCategoriyController)

module.exports = router