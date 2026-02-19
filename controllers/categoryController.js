const categoryModel = require("../model/category.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.addCategoryController = asyncController(async (req, res) => {
    const { name, subCategory, discount } = req.body
    const { filename } = req.file;
    const image = `${process.env.SEVER_URL}/${filename}`

    const category = new categoryModel({
        name, subCategory, discount, image
    })

    await category.save()
    apiResponse(200, res, "Category create successfully", category)
})

exports.allCategoryController = asyncController(async (req, res) => {
    const allCategory = await categoryModel.find({}).populate("subCategory");
    apiResponse(201, res, "All Category", allCategory)
})