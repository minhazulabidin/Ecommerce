const { default: mongoose } = require("mongoose");

const addressSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    district: {
        type: String,
        required: [true, "District is required"]
    },
    postalCode: {
        type: String
    },
},
    {
        _id: false
    }
)

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"]
    },
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            variant: {
                type: mongoose.Types.ObjectId,
                ref: "Variant",
            },
            quantity: {
                type: Number,
            }
        }
    ],
    paymentMethod: {
        type: String,
        enum: ["cod", "online"],
        required: [true, "Payment method is required"]
    },
    address: addressSchema,
    deliveryStatus: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Order", orderSchema)