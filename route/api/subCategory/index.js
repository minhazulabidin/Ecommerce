const express = require("express")
const { addSubCategoryController, updateSubCategoryController, deleteSubCategoryController } = require("../../../controllers/subCategoryController")
const router = express.Router()

router.post("/addSubcategory", addSubCategoryController)
router.patch("/updateSubcategory/:id", updateSubCategoryController)
router.delete("/deleteSubcategory/:id", deleteSubCategoryController)

module.exports = router