const categoryModel = require("../model/category.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");
const path = require("path");
const fs = require("fs");

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

exports.updateCategoryController = asyncController(async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, discount } = req.body;
    const { filename } = req.file;
    if (req.file) {
        const category = await categoryModel.findOne({ _id: id })
        const filePath = category.image.split("/")
        const imagePath = filePath[filePath.length - 1]
        const oldPath = path.join(__dirname, "../uploads")
        // console.log(`${oldPath}/${imagePath}`);
        fs.unlink(`${oldPath}/${imagePath}`, async (err) => {
            if (err) {
                return apiResponse(500, res, err.message)
            } else {
                const image = `${process.env.SEVER_URL}/${filename}`
                category.image = image
                category.subCategory = subCategory
                category.discount = discount
                category.name = name
                await category.save()
                apiResponse(200, res, "Category updated successfully", category)
            }
        })

    } else {
        const update = await categoryModel.findOneAndUpdate({ _id: id }, { name, subCategory, discount }, { new: true })
        apiResponse(200, res, "Category updated successfully", update)
    }

})