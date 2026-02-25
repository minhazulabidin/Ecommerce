const categoryModel = require("../model/category.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs");
const { replaceImage } = require("../helper/replaceImage");


// create categories 
exports.addCategoryController = asyncController(async (req, res) => {
    const { name, subCategory, discount } = req.body
    const { filename } = req.file;
    const image = `${process.env.SEVER_URL}/${filename}`
    const slug = slugify(name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        trim: true
    })
    const category = new categoryModel({
        name, subCategory, discount, image, slug
    })

    await category.save()
    apiResponse(200, res, "Category create successfully", category)
})

// update categories
exports.updateCategoryController = asyncController(async (req, res) => {
    const { id } = req.params;
    const { name, subCategory, discount } = req.body;

    const category = await categoryModel.findById(id);
    if (!category) {
        return apiResponse(404, res, "Category not found");
    }

    if (name !== undefined) {
        category.name = name;
        category.slug = slugify(name, {
            replacement: '-',
            lower: true,
            trim: true
        });
    }

    if (subCategory !== undefined) category.subCategory = subCategory;
    if (discount !== undefined) category.discount = discount;

    if (req.file) {
        const { filename } = req.file;
        await replaceImage(category.image, res);
        category.image = `${process.env.SEVER_URL}/${filename}`;
    }

    await category.save();
    return apiResponse(200, res, "Category updated successfully", category);
});

// delete categories
exports.deleteCategoryController = asyncController(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findOne({ _id: id })
    try {
        await replaceImage(category.image)
        await categoryModel.deleteOne({ _id: id })
        apiResponse(200, res, "Category delete successfully")
    } catch (err) {
        apiResponse(500, res, err.message)
    }
})

// get all categories
exports.allCategoryController = asyncController(async (req, res) => {
    const allCategory = await categoryModel.find({}).populate("subCategory");
    apiResponse(201, res, "All Category", allCategory)
})

// get single category
exports.getSingleCategoryController = asyncController(async (req, res) => {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug }).populate("subCategory");
    apiResponse(201, res, "Single Category", category)
})