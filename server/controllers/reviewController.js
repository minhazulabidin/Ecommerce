const productModel = require("../model/product.model");
const reviewModel = require("../model/review.model");
const userModel = require("../model/user.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.addReviewController = asyncController(async (req, res) => {
    const { comment, ratting, productId, userId } = req.body;
    if (isNaN(ratting)) {
        return apiResponse(400, res, "Rating must be a number");
    }
    if (req.files) {
        const image = req.files.map(item => {
            return `${process.env.SEVER_URL}/${item.filename}`
        })
        const review = new reviewModel({
            comment, ratting, productId, userId, image
        })
        await review.save()
    } else {
        const review = new reviewModel({
            comment, ratting, productId, userId
        })
        await review.save()
    }
    await Promise.all([
        userModel.findByIdAndUpdate(userId, { $push: { review: review._id } }),
        productModel.findByIdAndUpdate(productId, { $push: { review: review._id } })
    ]);
    apiResponse(201, res, "Review added successfully", review)
})