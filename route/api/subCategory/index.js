const express = require("express")
const { subCategoryController, updateSubCategoryController, deleteSubCategoryController } = require("../../../controllers/subCategoryController")
const router = express.Router()

router.post("/addSubcategory", subCategoryController)
router.patch("/updateSubcategory/:id", updateSubCategoryController)
router.delete("/deleteSubcategory/:id", deleteSubCategoryController)

module.exports = router