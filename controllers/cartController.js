const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.addToCartController = asyncController(async (req, res) => {
    const { product, user, quantity, variant } = req.body;

    if (!product || !user) {
        return apiResponse(400, res, "Product and user are required");
    }

    const productData = await productModel.findById(product);

    if (!productData) {
        return apiResponse(404, res, "Product not found");
    }

    const qtyToAdd = quantity ? Number(quantity) : 1;

    let cartData = await cartModel.findOne({ product, user });

    if (cartData) {

        // quantity add হবে
        cartData.quantity += qtyToAdd;

        // totalPrice নতুন করে হিসাব হবে
        cartData.totalPrice = cartData.quantity * productData.price;

        await cartData.save();

        return apiResponse(200, res, "Product quantity updated in cart", cartData);

    } else {

        // multivariant হলে variant required
        if (productData.variant === "multivariant" && !variant) {
            return apiResponse(400, res, "Variant is required");
        }

        const totalPrice = productData.price * qtyToAdd;

        const newCart = await cartModel.create({
            product,
            user,
            quantity: qtyToAdd,
            variant,
            totalPrice
        });

        return apiResponse(201, res, "Product added to cart", newCart);
    }
});