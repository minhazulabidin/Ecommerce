const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    totalPrice: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 1
    },
    variant: {
        type: mongoose.Types.ObjectId,
        ref: "Variant",
    }
}, {
    timestamps: true,
})

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;