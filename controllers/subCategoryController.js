const categoryModel = require("../model/category.model");
const subCategoryModel = require("../model/subCategory.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.subCategoryController = asyncController(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = new subCategoryModel({
        name, category
    })

    await subCategory.save();

    await categoryModel.findOneAndUpdate({ _id: category },
        { $push: { subCategory: subCategory._id } },
        { new: true })
        
    apiResponse(200, res, "Sub-Category create successfully", subCategory)
})