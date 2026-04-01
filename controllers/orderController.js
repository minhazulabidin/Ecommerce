const CartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.placeOrderController = asyncController(async (req, res) => {
    const { paymentMethod, address } = req.body;
    const user = req.session.user._id;
    const productData = await CartModel.find({ user })

    if (!productData || productData.length === 0) {
        return apiResponse(404, res, false, "No products in cart to place order")
    }
    const orderData = new orderModel({
        user, items: productData, paymentMethod, address
    })
    await orderData.save();
    apiResponse(200, res, "Order place successfully", orderData)
})

exports.allPlaceOrderController = asyncController(async (req, res) => {
    const allOrder = await orderModel.find({}).populate({
        path:"user",
        select:"fullName email -_id"
    }).populate({
        path:"items.product",
        select:"name image price -_id quantity"
    }).populate({
        path:"items.variant",
        select:"color size -_id"
    })
    apiResponse(200, res, "All order data", allOrder)
})