const CartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false

exports.placeOrderController = asyncController(async (req, res) => {
    const { paymentMethod, address } = req.body;
    const user = req.session.user._id;
    const productData = await CartModel.find({ user })
    const totalPrice = productData.reduce((prev, curr) => {
        return prev + curr.totalPrice
    }, 0)

    const trans_id = `tran_${user + Date.now() * 1000 + Math.round(Math.random() * 1000)}`;

    const productName = productData.map(item => item.product.name).join(', ');
    const productCategory = productData.map(item => item.product.category).join(', ');
    const data = {
        total_amount: totalPrice,
        currency: 'BDT',
        tran_id: trans_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: productName,
        product_category: productCategory,
        product_profile: 'general',
        cus_name: req.session.user.fullName,
        cus_email: req.session.user.email,
        cus_add1: address.address,
        cus_add2: address.address2 || 'Dhaka',
        cus_city: address.city || 'Dhaka',
        cus_state: address.state || 'Dhaka',
        cus_postcode: address.postalCode || '1000',
        cus_country: address.country || 'Bangladesh',
        cus_phone: address.phone,
        cus_fax: '01711111111',
        ship_name: "Naraz",
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    if (!productData || productData.length === 0) {
        return apiResponse(404, res, false, "No products in cart to place order")
    }
    const orderData = new orderModel({
        user, items: productData, paymentMethod, address, totalPrice, trans_id
    })
    if (paymentMethod === "online") {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            // res.redirect(GatewayPageURL)
            console.log('Redirecting to: ', GatewayPageURL)
        });
    }
    await orderData.save();
    apiResponse(200, res, "Order place successfully", orderData)
})

exports.allPlaceOrderController = asyncController(async (req, res) => {
    const allOrder = await orderModel.find({}).populate({
        path: "user",
        select: "fullName email -_id"
    }).populate({
        path: "items.product",
        select: "name image price -_id quantity"
    }).populate({
        path: "items.variant",
        select: "color size -_id"
    })
    apiResponse(200, res, "All order data", allOrder)
})