const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    sku: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Slug is required"]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Price is required"]
    },
    discountPrice: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: [String],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    variantType: {
        type: String,
        enum: ["singlevariant", "multivariant"],
        default: "singlevariant"
    },
    variant: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Variant"
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)