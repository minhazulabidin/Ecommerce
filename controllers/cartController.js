const productModel = require("../model/product.model");
const cartModel = require("../model/cart.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.addToCartController = asyncController(async (req, res) => {
    const { product, quantity, variant } = req.body;
    const user = req.session.user._id;
    const productData = await productModel.findById({ _id: product });

    const cartData = await cartModel.findOne({ product, user, variant: variant || null });

if (!productData) {
    return apiResponse(404, res, false, "Product not found")
}

const totalPrice = productData.price * (quantity ? quantity : 1);

if (cartData) {
    cartData.quantity += quantity ? quantity : 1;
    cartData.totalPrice = cartData.quantity * productData.price;
    await cartData.save();
    apiResponse(200, res, "Product quantity updated in cart successfully", cartData)

} else {
    if (productData.variantType === "multiVariant") {
        if (!variant) {
            return apiResponse(400, res, "Variant is required for multi variant product")
        } else {
            const addToCart = new cartModel({
                user, product, quantity, totalPrice, variant
            })
            await addToCart.save();
            return apiResponse(200, res, "Product added to cart successfully", addToCart)
        }
    } else {
        const addToCart = new cartModel({
            user, product, quantity, totalPrice
        })
        await addToCart.save();
        return apiResponse(200, res, "Product added to cart successfully", addToCart)
    }
}


})

exports.singleProductCartController = asyncController(async (req, res) => {
    const { user } = req.params

    const cartData = await cartModel.find({ user }).populate({ path: "product", select: "title price image variantType" }).populate({ path: "user", select: "fullName" }).populate({ path: "variant" })

    if (!cartData) {
        return apiResponse(404, res, false, "Cart not found")
    }

    apiResponse(200, res, "Cart data fetch successfully", cartData)
})