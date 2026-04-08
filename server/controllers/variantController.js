const { asyncController } = require("../utilities/asyncController");
const { apiResponse } = require("../utilities/apiResponse");
const variantModel = require("../model/variant.model");
const productModel = require("../model/product.model");

exports.addVariantController = asyncController(async (req, res) => {
    const { color, size, quantity, sku, productId } = req.body;
    const product = await productModel.findById(productId)
    if (product.variantType == "singlevariant") {
        apiResponse(400, res, "Single variant can not add variant")
    } else {
        const variant = await variantModel({
            color, size, quantity, sku, productId
        })
        await variant.save()
        await productModel.findByIdAndUpdate(productId, { $push: { variant: variant._id } })
        apiResponse(201, res, "Variant added successfully", variant)
    }
})