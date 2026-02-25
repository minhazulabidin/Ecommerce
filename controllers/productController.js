const productModel = require("../model/product.model");
const slugify = require('slugify')
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");
const categoryModel = require("../model/category.model");
const path = require("path")
const fs = require("fs");
const { replaceImage } = require("../helper/replaceImage");

exports.addProductController = asyncController(async (req, res) => {
    const { name, price, discountPrice, rating, description, category, variantType, sku } = req.body;
    const filenames = req.files.map(item => {
        return `${process.env.SEVER_URL}/${item.filename}`
    })
    const slug = slugify(name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        trim: true
    })
    const products = await productModel({
        name, slug, sku, price, discountPrice, image: filenames, rating, description, category, variantType
    })
    await products.save()
    await categoryModel.findByIdAndUpdate(category, { $push: { product: products._id } })
    apiResponse(201, res, "Product added successfully", products)
})

exports.deleteProductController = asyncController(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findOne({ _id: id })
    if (!product) {
        return apiResponse(404, res, "Product not found")
    } else {
        product.image.forEach(async item => {
            await replaceImage(item)
        })
        await productModel.deleteOne({ _id: id })
        await categoryModel.findByIdAndUpdate(product.category, { $pull: { product: id } }, { new: true })
        apiResponse(200, res, "Product delete successfully")
    }
})

exports.allProductController = asyncController(async (req, res) => {
    const allProducts = await productModel.find({})
    apiResponse(200, res, "All product fetch successfully", allProducts)
})

exports.singleProductController = asyncController(async (req, res) => {
    const { slug } = req.params
    const product = await productModel.findOne({ slug })
    if (!product) {
        apiResponse(404, res, "Product not found")
    } else {
        apiResponse(200, res, "Single product fetch successfully", product)
    }
})